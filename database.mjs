import mysql from 'mysql2';
import dotenv from 'dotenv';

// credit Sam Meech-Ward's video https://www.youtube.com/watch?v=Hej48pi_lOc, for code inspiration and foundation.

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}).promise();

async function checkMutedUser(userid) {
    const [rows] = await pool.query("SELECT * from mutedusers WHERE user_id = ?", [userid]);
    if (rows.length == 0) {
        return false;
    } else if (rows[0]["muted"] == 0) {
        return false;
    } else {
        return true;
    }
    ;
}

async function setMutedUser(userid, muteBool) {
    const [rows] = await pool.query("INSERT INTO mutedusers (user_id, muted) VALUES (?, ?) ON DUPLICATE KEY UPDATE muted = VALUES(muted)", [userid, muteBool]);
    return rows;
}

async function checkServerLang(guildid) {
    const [rows] = await pool.query("SELECT * from serverlanguage WHERE server_id = ?", [guildid]);
    if (rows.length == 0) {
        return "";
    } else {
        return rows[0]["language"]
    }
}

async function setServerLang(guildid, lang) {
    // lang must be 2 characters long
    if (lang.length != 2) { 
        return false;
    }
    const [rows] = await pool.query("INSERT INTO serverlanguage (server_id, language) VALUES (?, ?) ON DUPLICATE KEY UPDATE language = VALUES(language)", [guildid, lang]);
    return rows;
}

async function checkDmMutedUser(userid) {
    const [rows] = await pool.query("SELECT * from dmmutedusers WHERE user_id = ?", [userid]);
    if (rows.length == 0) {
        return false;
    } else if (rows[0]["muted"] == 0) {
        return false;
    } else {
        return true;
    }
    ;
}

async function setDmMutedUser(userid, muteBool) {
    const [rows] = await pool.query("INSERT INTO dmmutedusers (user_id, muted) VALUES (?, ?) ON DUPLICATE KEY UPDATE muted = VALUES(muted)", [userid, muteBool]);
    return rows;
}

async function checkLastDmTime(userid) {
    const [rows] = await pool.query("SELECT lastdm as stamp from dmtimes WHERE user_id = ?", [userid]);
    if (rows.length == 0) {
        return 0;
    } else {
        return rows[0]["stamp"]
    }
}

async function setLastDmTime(userid, time) {
    const [rows] = await pool.query("INSERT INTO dmtimes (user_id, lastdm) VALUES (?, ?) ON DUPLICATE KEY UPDATE lastdm = VALUES(lastdm)", [userid, time]);
    return rows;
}

function check() {
    return "pass";
}

export { checkMutedUser, setMutedUser, checkServerLang, setServerLang, check, checkDmMutedUser, setDmMutedUser, checkLastDmTime, setLastDmTime};