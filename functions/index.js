// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.auth.user().onCreate(event => {
    return admin.database().ref(`/users/${event.data.uid}`).set({
        createdAt: event.data.metadata.createdAt || null,
        email: event.data.email || null,
        photoUrl: event.data.photoURL || null,
        username: event.data.displayName || null
    });
});