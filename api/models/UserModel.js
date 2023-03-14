const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio:{
            description: {
                type: String
            },
            link: {
                type:String
            }
        },
    avatar: [
        {
            public_id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            }
        }
    ],
    posts: [
        {
            public_id: {
                type: String,
                required: true
            },
            secure_url: {
                type: String,
                required: true
            },
            caption: {
                type: String
            },
            likes: {
                user: [
                    {
                        userID: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        }
                    }
                ],
                count: {
                    type: Number,
                    required: true,
                    default: 0

                }
            }
            ,
            comment: {
                user: [
                    {
                        userID: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        comment: {
                            type: String,
                            required: true,

                        }
                    }
                ],
                count: {
                    type: Number,
                    required: true,
                    default: 0
                }

            },
            count: {
                type: Number,
                required: true,
                default: 0
            }

        }
    ],
    followers: {
        user: [
            {
                useID: {
                    type: mongoose.Types.ObjectId,
                    required: true
                }
            }
        ],
        count: {
            type: Number,
            required: true,
            default: 0

        }
    }
    ,
    following: {
        user: [
            {
                useID: {
                    type: mongoose.Types.ObjectId,
                    required: true
                }
            }
        ],
        count: {
            type: Number,
            required: true,
            default: 0

        },
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    passwordRecoveryExpire: {
        type: Boolean,
        default: true
    },
    passwordSecreteNumber: Number
})

const User = mongoose.model('user', UserSchema);

module.exports = User