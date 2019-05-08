import React, { Component } from 'react';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
import { Platform, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, PermissionsAndroid, PushNotificationIOS } from 'react-native';
import styles from "./Styles/TwilioVideoStyles";


export default class TwilioVideoScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAudioEnabled: true,
            isVideoEnabled: true,
            status: 'disconnected',
            participants: new Map(),
            videoTracks: new Map(),
            roomName: "",
            token: ''
        }
    }
  
    componentWillMount() {
        if(Platform.OS == "android") {
            this.setState({
                //user2
                roomName: "TwilioVideoRoom",
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzk0MWZmMzI1MDIyZGQxZjEyMWZmZjYyMDI3ODY2NDJiLTE1NTczMjAzMTciLCJpc3MiOiJTSzk0MWZmMzI1MDIyZGQxZjEyMWZmZjYyMDI3ODY2NDJiIiwic3ViIjoiQUNhMmUzYjYyODQ4ZTBlYWIxM2QwZTU5NjZiOGNiNDZkNCIsImV4cCI6MTU1NzMyMzkxNywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiVXNlcjIiLCJ2aWRlbyI6eyJyb29tIjoiVHdpbGlvVmlkZW9Sb29tIn19fQ.2qWG1tUi9KLSQZKzDcuksmI1QfjcF5v4KnMwG0mKOm0'
            })
            this.requestAudioRecordPermission();
        } 
        if(Platform.OS == "ios") {
            this.setState({
                //user1
                roomName: "TwilioVideoRoom",
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzk0MWZmMzI1MDIyZGQxZjEyMWZmZjYyMDI3ODY2NDJiLTE1NTczMjIxMDkiLCJpc3MiOiJTSzk0MWZmMzI1MDIyZGQxZjEyMWZmZjYyMDI3ODY2NDJiIiwic3ViIjoiQUNhMmUzYjYyODQ4ZTBlYWIxM2QwZTU5NjZiOGNiNDZkNCIsImV4cCI6MTU1NzMyNTcwOSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiVXNlcjEiLCJ2aWRlbyI6eyJyb29tIjoiVHdpbGlvVmlkZW9Sb29tIn19fQ.xDGo3i2ssu9Rkd4dEFP_IqocnKgnW_9IoL0Pvnx-wnQ'
            })
            this.requestAudioRecordPermission();
        }       
    }

    onConnectButtonPress = () => {
        console.log("onConnectButtonPress");        
        console.log(this.state.status);   
        this.refs.twilioVideo.connect({ roomName: this.state.roomName, accessToken: this.state.token });
        this.setState({status: 'connecting'})
    }

    onEndButtonPress = () => {
        console.log("onEndButtonPress");    
        this.refs.twilioVideo.disconnect()
    }

    onMuteButtonPress = () => {
        console.log("onMuteButtonPress"); 
        this.refs.twilioVideo.setLocalAudioEnabled(!this.state.isAudioEnabled)
        .then(isEnabled => this.setState({isAudioEnabled: isEnabled}))
    }

    onFlipButtonPress = () => {
        console.log("onFlipButtonPress"); 
        this.refs.twilioVideo.flipCamera()
    }

    onRoomDidConnect = () => {
        console.log("onRoomDidConnect");
        this.setState({status: 'connected'})
    }

    onRoomDidDisconnect = ({roomName, error}) => {
        console.log("onRoomDidDisconnect");
        console.log("ERROR: ", error)

        this.setState({status: 'disconnected'})
    }

    onRoomDidFailToConnect = (error) => {
        console.log("onRoomDidFailToConnect");
        console.log("ERROR: ", error)
        var str = error.error;
        // console.log(error.error)
        alert(str);

        this.setState({status: 'disconnected'})
    }

    onParticipantAddedVideoTrack = ({participant, track}) => {
        console.log("_onParticipantAddedVideoTrack");
        console.log("onParticipantAddedVideoTrack: ", participant, track)

        this.setState({
        videoTracks: new Map([
            ...this.state.videoTracks,
            [track.trackSid, { participantSid: participant.sid, videoTrackSid: track.trackSid }]
        ]),
        });
    }

    onParticipantRemovedVideoTrack = ({participant, track}) => {
        console.log("_onParticipantRemovedVideoTrack");
        console.log("onParticipantRemovedVideoTrack: ", participant, track)

        const videoTracks = this.state.videoTracks
        videoTracks.delete(track.trackSid)

        this.setState({videoTracks: { ...videoTracks }})
    }

    async requestAudioRecordPermission() {
        try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
            title: 'Record Audio Permission',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the recoeder');
            this.requestCameraPermission();
        } else {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                title: 'Record Audio Permission',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
        }
        } catch (err) {
        console.warn(err);
        }
    }

    async requestCameraPermission() {
        try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
            title: 'Camera Permission',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the recoeder');
        } else {
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                title: 'Camera Permission',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
        }
        } catch (err) {
        console.warn(err);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                this.state.status === 'disconnected' &&
                <View>
                    <Text style={styles.welcome}>
                        React Native Twilio Video
                    </Text>
                    <Text style={styles.label}>
                        Enter Video RoomName:
                    </Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        value={this.state.roomName}
                        onChangeText={(text) => this.setState({roomName: text})}>
                    </TextInput>
                    <Text style={styles.label}>
                        Enter Auth Token:
                    </Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        value={this.state.token}
                        onChangeText={(text) => this.setState({token: text})}>
                    </TextInput>
                    <TouchableOpacity
                        style={styles.connectBtn}
                        onPress={this.onConnectButtonPress}>
                        <Text style={styles.connectTxt}>CONNECT</Text>
                    </TouchableOpacity>
                </View>
                }

                {
                (this.state.status === 'connected' || this.state.status === 'connecting') &&
                    <View style={styles.callContainer}>
                    {
                    this.state.status === 'connected' &&
                    <TouchableOpacity style={styles.remoteGrid}>
                        {
                        Array.from(this.state.videoTracks, ([trackSid, trackIdentifier]) => {
                            return (
                            <TwilioVideoParticipantView
                                style={styles.remoteVideo}
                                key={trackSid}
                                trackIdentifier={trackIdentifier}
                            />
                            )
                        })
                        }
                    </TouchableOpacity>
                    }
                    <View
                    style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={this.onEndButtonPress}>
                        <Text style={{fontSize: 12}}>End</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={this.onMuteButtonPress}>
                        <Text style={{fontSize: 12}}>{ this.state.isAudioEnabled ? "Mute" : "Unmute" }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={this.onFlipButtonPress}>
                        <Text style={{fontSize: 12}}>Flip</Text>
                    </TouchableOpacity>
                    <TwilioVideoLocalView
                        enabled={true}
                        style={styles.localVideo}
                    />
                    </View>
                </View>
                }

                <TwilioVideo
                    ref="twilioVideo"
                    onRoomDidConnect={ this.onRoomDidConnect }
                    onRoomDidDisconnect={ this.onRoomDidDisconnect }
                    onRoomDidFailToConnect= { this.onRoomDidFailToConnect }
                    onParticipantAddedVideoTrack={ this.onParticipantAddedVideoTrack }
                    onParticipantRemovedVideoTrack= { this.onParticipantRemovedVideoTrack }
                />
            </View>
            );
        }
    }
