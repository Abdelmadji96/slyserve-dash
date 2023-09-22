import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.secret || "secret", (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid token, you are not authorized" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No token" });
  }
};

export const isParticulier = (req, res, next) => {
  if (req.user && req.user.particulier) {
    next();
  } else {
    res.status(401).json({ message: "Invalid token, you are not a patient" });
  }
};

export const isMedecin = (req, res, next) => {
  if (req.user && req.user.medecin) {
    next();
  } else {
    res.status(401).json({ message: "Invalid token, you are not a doctor" });
  }
};

export const isParamedical = (req, res, next) => {
  if (req.user && req.user.paramedical) {
    next();
  } else {
    res.status(401).json({ message: "Invalid token, you are not a paramedical" });
  }
};

export const isLaboratory = (req, res, next) => {
  if (req.user && req.user.laboratoire) {
    next();
  } else {
    res.status(401).json({ message: "Invalid token, you are not a laboratory" });
  }
};
