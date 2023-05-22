/* Import des modules necessaires */
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });

/* Controleur module inscription */
exports.signup = (req, res, next) => {
    // Hashage du mot de passe utilisateur

    bcrypt
        .hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            });
            // Creation de l'utilisateur
            user
                .save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/* Module Controleur login */
exports.login = (req, res, next) => {
    // Verification utilisateur existant
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            // Verification mot de passe utilisateur
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    // Connexion valide = token 24H
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
                            expiresIn: "1h",
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};