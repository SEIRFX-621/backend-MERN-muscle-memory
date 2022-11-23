// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const User = require('../models/user');
const Doodle = require('../models/doodle');
const DoodleVersion = require('../models/doodleVersion');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (!req.user) throw new Error('No user in session');
        const doodle = await Doodle.findOne({user: req.user._id}).populate('doodleVersion');
        if (!doodle) {
            res.json({
                doodleHistory: null
            })
        } else {
            res.json({
                doodleHistory: doodle
            })
        }
    } catch (error) {
        console.log(`Error in fetching ${req.user.name}'s Doodle`);
        res.status(400).json({
            error: 'Failed to fetch user Doodle'
        })
    }
})

router.post('/update', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        if (!req.user) throw new Error('No user in session');
        // find our existing doodle
        let doodle = await Doodle.findOne({user: req.user._id}).populate('doodleVersion');
        if (!doodle) {
            // if doodle isn't found, we'll create a new doodle
            const initialDoodleVersion = await DoodleVersion.create({
                version: 0,
                doodleData: []
            })
            doodle = await Doodle.create({
                user: req.user,
                doodleVersion: [initialDoodleVersion]
            })
        }

        const { doodleCoords, version } = req.body;
        if (!doodleCoords) throw new Error('No new doodle coordinates passed in request');
        const newDoodleData = doodleCoords.map((coords) => {
            return {
                x: parseInt(coords.xCoord),
                y: parseInt(coords.yCoord)
            }
        })
        const newDoodleVersion = await DoodleVersion.create({
            version: parseInt(version),
            doodleData:  newDoodleData
        });
        doodle.doodleVersion.push(newDoodleVersion);
        await doodle.save();
        res.json({
            doodleHistory: doodle
        })
    } catch (error) {
        console.log(`Error in fetching ${req.user.name}'s Doodle`);
        res.status(400).json({
            error: 'Failed to fetch user Doodle'
        })
    }
})


// Exports
module.exports = router;