/**
 * English locale
 */
export default {
    common: {
        confirm: 'OK',
        cancel: 'Cancel',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        reset: 'Reset',
        submit: 'Submit',
        back: 'Back',
        loading: 'Loading...',
        success: 'Success',
        fail: 'Failed',
    },
    nav: {
        home: 'Home',
        about: 'About',
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        toRegister: 'Register',
        toLogin: 'Login',
    },
    menu: {
        title: 'Menu',
    },
    app: {
        name: 'XIAOMIZHA',
        title: 'XIAOMIZHA Admin',
        welcome: 'Welcome',
        slogan: 'XIAOMIZHA Frontend',
        subtitle: 'Efficient, Secure, Smart Management',
        copyright: 'XIAOMIZHA, Ltd. All rights reserved.',
        userAgreement: 'User Agreement',
        privacyPolicy: 'Privacy Policy',
        serviceAgreement: 'Product Service Agreement',
        contactUs: 'Contact Us',
    },
    auth: {
        pleaseLogin: 'Please login first',
        loginFailed: 'Failed to get user info, please login again',
        logoutSuccess: 'Logged out',
        welcomeBack: 'Welcome back',
        pleaseLoginAccount: 'Please sign in to your account',
        createdAccount: 'Create an account',
        pleaseFillRegInfo: 'Please fill in the registration information',
        username: 'Username',
        password: 'Password',
        pleaseEnterUsername: 'Please enter username',
        pleaseEnterPassword: 'Please enter password',
        pleaseReEnterPassword: 'Please re enter password',
        login: 'Login',
        register: 'Register',
        goRegister: 'Register',
        goLogin: 'Login',
        autoLogin: 'Remember me',
        forgotPassword: 'Forgot password',
        otherLoginWays: 'Other sign in',
        readAgreed: 'I have read and agreed',
    },
    userDropdown: {
        security: 'Security',
        helpCenter: 'Help Center',
        about: 'About',
        comingSoon: 'Coming soon',
    },
    admin: {
        dashboard: 'Dashboard',
        system: 'System',
        userManage: 'Users',
        profilesManage: 'Profiles',
        userDetailManage: 'User Details',
        roleManage: 'Roles',
        resourceManage: 'Resources',
        userNames: 'User Names',
        userNameHistory: 'Name History',
        vipLevelConfig: 'VIP Level Config',
        systemConfigs: 'System Configs',
        userFeedback: 'User Feedback',
        licensesManage: 'Licenses',
        profile: 'Profile',
        personalCenter: 'Profile',
        personalSettings: 'Settings',
        personalSecurity: 'Account Security',
        user: 'User',
        signInManage: 'Sign In',
        signInCenter: 'Sign In Center',
    },
    personalSecurity: {
        title: 'Account Security',
        password: {
            title: 'Login Password',
            description: 'Changing your password regularly improves account security',
            changePassword: 'Change Password',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm New Password',
            currentPasswordPlaceholder: 'Enter current password',
            newPasswordPlaceholder: 'Enter new password',
            confirmPasswordPlaceholder: 'Re-enter new password',
            passwordMinLength: 'Password must be at least 6 characters',
            passwordNotMatch: 'Passwords do not match',
            changeSuccess: 'Password changed successfully',
            changeFailed: 'Failed to change password',
            currentPasswordError: 'Current password is incorrect',
            lastChanged: 'Last changed',
            neverChanged: 'Never changed'
        },
        twoFactor: {
            title: 'Two-Factor Authentication',
            description: 'Enable two-factor authentication for extra protection',
            enable: 'Enable',
            disable: 'Disable',
            enabled: 'Enabled',
            disabled: 'Disabled',
            scanQrCode: 'Scan the QR code with your authenticator app',
            enterCode: 'Enter 6-digit code',
            codePlaceholder: 'Enter 6-digit code',
            verifySuccess: 'Verification successful',
            verifyFailed: 'Verification failed',
            enableSuccess: 'Two-factor authentication enabled',
            disableSuccess: 'Two-factor authentication disabled',
            disableConfirm: 'Disabling two-factor authentication reduces account security. Are you sure?'
        },
        loginHistory: {
            title: 'Login History',
            description: 'View recent login records',
            viewAll: 'View All',
            device: 'Device',
            location: 'Location',
            ip: 'IP Address',
            time: 'Login Time',
            status: 'Status',
            current: 'Current Device',
            success: 'Success',
            failed: 'Failed',
            noRecords: 'No login records'
        },
        securityQuestions: {
            title: 'Security Questions',
            description: 'Set security questions for password recovery',
            set: 'Set',
            edit: 'Edit',
            question1: 'Question 1',
            question2: 'Question 2',
            question3: 'Question 3',
            answer: 'Answer',
            answerPlaceholder: 'Enter answer',
            setSuccess: 'Security questions set successfully',
            updateSuccess: 'Security questions updated successfully',
            questions: {
                petName: 'What was the name of your first pet?',
                motherMaidenName: 'What is your mother\'s maiden name?',
                birthCity: 'What city were you born in?',
                favoriteFood: 'What is your favorite food?',
                firstSchool: 'What was the name of your first school?',
                favoriteMovie: 'What is your favorite movie?',
                childhoodFriend: 'What is the name of your childhood best friend?',
                favoriteBook: 'What is your favorite book?'
            }
        },
        sessions: {
            title: 'Login Devices',
            description: 'Manage logged in devices',
            currentDevice: 'Current Device',
            lastActive: 'Last Active',
            logout: 'Log Out',
            logoutAll: 'Log Out All Other Devices',
            logoutConfirm: 'Are you sure you want to log out this device?',
            logoutAllConfirm: 'Are you sure you want to log out all other devices?',
            logoutSuccess: 'Logged out successfully',
            logoutAllSuccess: 'All other devices logged out successfully',
            noOtherDevices: 'No other logged in devices'
        },
        accountStatus: {
            title: 'Account Status',
            normal: 'Normal',
            risk: 'At Risk',
            locked: 'Locked',
            securityScore: 'Security Score',
            suggestions: 'Security Suggestions',
            enableTwoFactor: 'Enable two-factor authentication',
            changePassword: 'Change password',
            setSecurityQuestions: 'Set security questions'
        }
    },
    theme: {
        light: 'Light',
        dark: 'Dark',
        primaryColor: 'Primary Color',
    },
    dashboard: {
        totalUsers: 'Total Users',
        totalRoles: 'Total Roles',
        totalResources: 'Total Resources',
        onlineUsers: 'Online Users',
        systemInfo: 'System Info',
        systemName: 'System Name',
        version: 'Version',
        currentUser: 'Current User',
        loginTime: 'Login Time',
        quickActions: 'Quick Actions',
        userManagement: 'User Management',
        roleManagement: 'Role Management',
        resourceManagement: 'Resource Management',
        signInCenter: 'Sign In Center',
        loadStatsFailed: 'Failed to load statistics',
        viewAll: 'View All',
    },
    signIn: {
        signInStatus: 'Sign In Status',
        todaySigned: 'Today Signed',
        signed: 'Signed',
        notSigned: 'Not Signed',
        signInNow: 'Sign In Now',
        signingIn: 'Signing in...',
        viewOnly: 'View Only',
        continuousDays: 'Continuous Days',
        day: 'day',
        totalSignIns: 'Total Sign Ins',
        times: 'times',
        maxContinuous: 'Max Continuous',
        lastSignIn: 'Last Sign In',
        tomorrowReward: 'Tomorrow Reward',
        points: 'Points',
        monthlyRecord: 'Monthly Record',
        monthlySignIns: 'Monthly Sign Ins',
        monthlyContinuous: 'Monthly Continuous',
        monthlyPoints: 'Monthly Points',
        pointsUnit: 'points',
        ranking: 'Sign In Ranking',
        totalSignInsRanking: 'Total Sign Ins',
        continuousDaysRanking: 'Continuous Days',
        monthlySignInsRanking: 'Monthly Sign Ins',
        rank: 'Rank',
        userId: 'User ID',
        getStatusFailed: 'Failed to get sign in status',
        signInFailed: 'Sign in failed, please try again later',
        getMonthlyRecordFailed: 'Failed to get monthly record',
        getRankingFailed: 'Failed to get ranking',
    },
    signInUserManagement: {
        title: 'User Sign In Records',
        columns: {
            userId: 'User ID',
            userName: 'Username',
            totalSignIns: 'Total Sign Ins',
            continuousDays: 'Continuous Days',
            maxContinuousDays: 'Max Continuous',
            monthlySignIns: 'Monthly Sign Ins',
            pointsEarned: 'Points Earned',
            todaySigned: 'Today Status',
            lastSignInDate: 'Last Sign In Date',
            action: 'Action'
        },
        search: {
            userIdPlaceholder: 'Enter User ID',
            userNamePlaceholder: 'Enter Username',
            monthPlaceholder: 'Select Month',
            search: 'Search',
            reset: 'Reset'
        },
        action: {
            viewDetail: 'View Detail',
            brief: 'Brief'
        },
        detail: {
            title: 'Sign In Detail',
            monthlyRecord: 'Monthly Sign In Record'
        },
        brief: {
            title: 'Sign In Brief',
            monthlyRecord: 'Monthly Sign In Record'
        },
        export: {
            button: 'Export Data',
            title: 'Confirm Export',
            content: 'Are you sure to export sign in data with current filters?',
            success: 'Export successful',
            failed: 'Export failed'
        },
        messages: {
            loadFailed: 'Failed to load data'
        },
        pagination: {
            total: '{total} records in total'
        }
    },
    home: {
        modernFrontend: 'Modern Frontend Development Experience',
        frontendSolution: 'Frontend solution based on Vue 3 + TypeScript + Vite + Ant Design Vue',
        illustration: 'Illustration',
        welcome: 'Welcome',
        loginToUse: 'Log in to use full features',
        login: 'Login',
        enterAdmin: 'Enter Admin',
        logout: 'Logout',
        guestUser: 'Guest User',
        normalUser: 'Normal User',
        logoutSuccess: 'Logged out successfully',
    },
    about: {
        aboutProject: 'About Project',
        projectInfo: 'Project Info',
        projectName: 'Project Name',
        techStack: 'Tech Stack',
        buildTool: 'Build Tool',
        uiLibrary: 'UI Library',
        router: 'Router',
        techDescription: 'Tech Description',
        viteDesc: 'Vite - Next-generation frontend build tool, providing blazing-fast development experience',
        vueDesc: 'Vue 3 - Progressive JavaScript framework using Composition API',
        tsDesc: 'TypeScript - Adds type system to JavaScript',
        antDesc: 'Ant Design Vue - Enterprise-level UI design language and component library',
        features: 'Features',
        modernDev: 'Modern Development',
        modernDevDesc: 'Using Vue 3 Composition API and TypeScript for type-safe development experience',
        fastBuild: 'Fast Build',
        fastBuildDesc: 'Based on Vite development server and build tool, providing millisecond-level hot updates',
        beautifulUi: 'Beautiful UI',
        beautifulUiDesc: 'Integrated with Ant Design Vue component library, providing rich UI components and design specifications',
        secure: 'Secure & Reliable',
        secureDesc: 'Built-in route guards and state management, providing secure user authentication and permission control',
    },
    error: {
        notFound: 'Page Not Found',
        errorDescription: 'Sorry, the page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
        back: 'Back',
        goHome: 'Go Home',
    },
    login: {
        pleaseEnterUsername: 'Please enter username',
        pleaseEnterPassword: 'Please enter password',
        passwordMinLength: 'Password length must be at least 6 characters',
        loginSuccess: 'Login successful',
        loginFailed: 'Login failed, please try again later',
        usernamePasswordError: 'Incorrect username or password',
        githubLogin: 'GitHub Login',
        googleLogin: 'Google Login',
        qqLogin: 'QQ Login',
        wechatLogin: 'WeChat Login',
        webcatxLogin: 'WebCatX Login',
    },
    register: {
        pleaseEnterUsername: 'Please enter username',
        usernameLength: 'Username length should be 2-32 characters',
        pleaseEnterPassword: 'Please enter password',
        passwordMinLength: 'Password length must be at least 6 characters',
        pleaseReEnterPassword: 'Please re-enter password',
        passwordNotMatch: 'The two passwords do not match',
        pleaseAgree: 'Please read and agree to the relevant agreements',
        registerSuccess: 'Registration successful, please login',
        registerFailed: 'Registration failed, please try again later',
        usernameExists: 'Registration failed: Username already exists or has been disabled',
    },
    locale: {
        zhCN: '简体中文',
        zhTW: '繁體中文',
        enUS: 'English',
        ruRU: 'Русский',
    },
    resource: {
        management: {
            title: 'Resource Management',
            expandAll: 'Expand All',
            collapseAll: 'Collapse All',
            addResource: 'Add Resource',
            edit: 'Edit',
            delete: 'Delete',
            editResource: 'Edit Resource',
            columns: {
                resourceName: 'Resource Name',
                resourceCode: 'Resource Code',
                resourceCategory: 'Resource Type',
                sortOrder: 'Sort Order',
                status: 'Status',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                extraInfo: 'Extra Info (Optional)',
                resourceName: 'Resource Name',
                resourceCode: 'Resource Code',
                resourceDescription: 'Resource Description',
                resourceCategory: 'Resource Type',
                resourcePath: 'Resource Path',
                parentId: 'Parent Resource',
                level: 'Resource Level',
                sortOrder: 'Sort Order',
                status: 'Status',
                createBy: 'Creator User ID',
                updateBy: 'Updater User ID',
                resourceComponent: 'Component Path',
                resourceIcon: 'Resource Icon',
                visible: 'Visible',
                isSystem: 'System Built-in Resource',
                permissionFlag: 'Permission Flag',
                requiresAuth: 'Requires Authentication',
                keepAlive: 'Keep Page Alive',
                externalLink: 'External Link',
                target: 'Link Open Method',
                badge: 'Badge Content',
                badgeType: 'Badge Type',
                metaJson: 'Metadata (JSON)',
                catalog: 'Catalog',
                menu: 'Menu',
                button: 'Button',
                api: 'API',
                page: 'Page',
                module: 'Module',
                other: 'Other',
                none: 'None',
                validate: {
                    resourceName: 'Please enter resource name',
                    resourceCategory: 'Please select resource type',
                    status: 'Please select status'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete resource "{resourceName}"?'
                }
            }
        },
        common: {
            enabled: 'Enabled',
            disabled: 'Disabled',
            visible: 'Visible',
            hidden: 'Hidden',
            yes: 'Yes',
            no: 'No'
        }
    },
    role: {
        management: {
            title: 'Role Management',
            addRole: 'Add Role',
            edit: 'Edit',
            delete: 'Delete',
            editRole: 'Edit Role',
            columns: {
                roleId: 'Role ID',
                roleName: 'Role Name',
                roleCode: 'Role Code',
                roleDescription: 'Role Description',
                isSystemRole: 'System Role',
                isDefault: 'Default Role',
                sortOrder: 'Sort Order',
                status: 'Status',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                extraInfo: 'Extra Info (Optional)',
                roleName: 'Role Name',
                roleCode: 'Role Code',
                roleDescription: 'Role Description',
                sortOrder: 'Sort Order',
                status: 'Status',
                isSystemRole: 'System Role',
                isDefault: 'Default Role',
                validate: {
                    roleName: 'Please enter role name',
                    status: 'Please select status'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete role "{roleName}"?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        },
        common: {
            enabled: 'Enabled',
            disabled: 'Disabled',
            systemRole: 'System Role',
            normalRole: 'Normal Role',
            yes: 'Yes',
            no: 'No'
        }
    },
    systemConfig: {
        management: {
            title: 'System Config',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            columns: {
                id: 'ID',
                configKey: 'Config Key',
                configValue: 'Config Value',
                configType: 'Type',
                description: 'Description',
                isPublic: 'Public',
                createdAt: 'Created At',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                extraInfo: 'Extra Info (Optional)',
                configKey: 'Config Key',
                configValue: 'Config Value',
                configType: 'Config Type',
                description: 'Description',
                isPublic: 'Public Config',
                configKeyPlaceholder: 'Unique key, e.g. app.name',
                validate: {
                    configKey: 'Please enter config key',
                    configValue: 'Please enter config value',
                    configType: 'Please select type'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete config "{configKey}"?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        },
        common: {
            yes: 'Yes',
            no: 'No'
        }
    },
    userFeedback: {
        management: {
            title: 'User Feedback',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            columns: {
                id: 'ID',
                userId: 'User ID',
                type: 'Type',
                content: 'Content',
                status: 'Status',
                createdAt: 'Created At',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                extraInfo: 'Extra Info (Optional)',
                userId: 'User ID',
                type: 'Feedback Type',
                content: 'Feedback Content',
                status: 'Status',
                contactInfo: 'Contact Info',
                reply: 'Reply Content',
                validate: {
                    userId: 'Please enter user ID',
                    type: 'Please select feedback type',
                    content: 'Please enter feedback content',
                    status: 'Please select status'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete feedback #{id}?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        },
        common: {
            type: {
                systemIssue: 'System Issue',
                featureSuggestion: 'Feature Suggestion',
                bugReport: 'BUG Report',
                other: 'Other'
            },
            status: {
                pending: 'Pending',
                accepted: 'Accepted',
                resolved: 'Resolved',
                closed: 'Closed'
            }
        }
    },
    userManagement: {
        title: 'User Management',
        addUser: 'Add User',
        edit: 'Edit',
        delete: 'Delete',
        editUser: 'Edit User',
        detail: 'Detail',
        columns: {
            userId: 'User ID',
            username: 'Username',
            accountStatus: 'Account Status',
            createdAt: 'Created At',
            action: 'Action'
        },
        form: {
            basicInfo: 'Basic Info (Required)',
            username: 'Username',
            password: 'Password',
            resetPassword: 'Reset Password',
            resetPasswordPlaceholder: 'Leave empty to keep current password',
            accountStatus: 'Account Status',
            randomUsername: 'Generate Random Username',
            randomPassword: 'Generate Random Password',
            validate: {
                username: 'Please enter username',
                password: 'Please enter password',
                accountStatus: 'Please select account status'
            }
        },
        messages: {
            loadFailed: 'Failed to load data',
            deleteSuccess: 'Delete successful',
            deleteFailed: 'Delete failed',
            updateSuccess: 'Update successful',
            registerSuccess: 'Register successful'
        },
        confirm: {
            delete: {
                title: 'Confirm Delete',
                content: 'Are you sure to delete user "{username}"?'
            }
        },
        status: {
            normal: 'Normal',
            disabled: 'Disabled'
        },
        pagination: {
            total: 'Total {total} items'
        }
    },
    userNameHistory: {
        management: {
            title: 'Username Change History',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            columns: {
                historyId: 'History ID',
                userId: 'User ID',
                oldDisplayName: 'Old Display Name',
                newDisplayName: 'New Display Name',
                changedBy: 'Changed By',
                changedAt: 'Changed At',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                userId: 'User ID',
                oldDisplayName: 'Old Display Name',
                newDisplayName: 'New Display Name',
                changedBy: 'Changed By User ID',
                createdBy: 'Created By User ID',
                randomNewDisplayName: 'Generate Random New Display Name',
                validate: {
                    userId: 'Please enter user ID',
                    oldDisplayName: 'Please enter old display name',
                    newDisplayName: 'Please enter new display name'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete history record #{historyId}?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        }
    },
    userNames: {
        management: {
            title: 'Username Info Management',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            columns: {
                nameId: 'Name ID',
                userId: 'User ID',
                createName: 'Create Username',
                displayName: 'Display Name',
                isDefaultDisplay: 'Default Display',
                createdAt: 'Created At',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                userId: 'User ID',
                createName: 'Create Username',
                displayName: 'Display Name',
                isDefaultDisplay: 'Default Display',
                randomCreateName: 'Generate Random Create Username',
                randomDisplayName: 'Generate Random Display Name',
                validate: {
                    userId: 'Please enter user ID',
                    createName: 'Please enter create username',
                    displayName: 'Please enter display name',
                    isDefaultDisplay: 'Please select'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete username "{displayName}"?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        },
        common: {
            yes: 'Yes',
            no: 'No'
        }
    },
    vipLevel: {
        management: {
            title: 'VIP Level Config',
            add: 'Add',
            edit: 'Edit',
            delete: 'Delete',
            columns: {
                levelId: 'Level ID',
                vipLevel: 'VIP Level',
                levelName: 'Level Name',
                minPoints: 'Min Growth Points',
                maxPoints: 'Max Growth Points',
                dailyPointsLimit: 'Daily Limit',
                monthlyPointsLimit: 'Monthly Limit',
                status: 'Status',
                createdAt: 'Created At',
                action: 'Action'
            },
            form: {
                basicInfo: 'Basic Info (Required)',
                extraInfo: 'Extra Info (Optional)',
                vipLevel: 'VIP Level',
                levelName: 'Level Name',
                minPoints: 'Min Growth Points',
                maxPoints: 'Max Growth Points',
                dailyPointsLimit: 'Daily Limit',
                monthlyPointsLimit: 'Monthly Limit',
                status: 'Status',
                iconUrl: 'Icon URL',
                badgeColor: 'Badge Color',
                benefitsJson: 'Benefits Config (JSON)',
                maxPointsPlaceholder: 'Leave empty for no limit',
                iconUrlPlaceholder: 'Icon URL',
                badgeColorPlaceholder: '#hex or color name',
                benefitsJsonPlaceholder: 'JSON format, e.g.: {"discount": 0.9, "freeShipping": true}',
                validate: {
                    vipLevel: 'Please enter VIP level',
                    levelName: 'Please enter level name',
                    minPoints: 'Please enter min growth points',
                    dailyPointsLimit: 'Please enter daily limit',
                    monthlyPointsLimit: 'Please enter monthly limit',
                    status: 'Please select status'
                }
            },
            messages: {
                loadFailed: 'Failed to load data',
                deleteSuccess: 'Delete successful',
                deleteFailed: 'Delete failed',
                updateSuccess: 'Update successful',
                createSuccess: 'Create successful'
            },
            confirm: {
                delete: {
                    title: 'Confirm Delete',
                    content: 'Are you sure to delete level "{levelName}"?'
                }
            },
            pagination: {
                total: 'Total {total} items'
            }
        },
        common: {
            enabled: 'Enabled',
            disabled: 'Disabled'
        }
    },
    userDetail: {
        title: 'User Detail Management',
        noData: 'Please search for a user to view details',
        basicInfo: 'Basic Information',
        profileInfo: 'Profile',
        nameInfo: 'User Name Info',
        pointsInfo: 'Points Info',
        vipInfo: 'VIP Info',
        rolesInfo: 'Roles',
        nameHistory: 'Name Change History',
        feedbackInfo: 'User Feedback',
        licenseInfo: 'User Licenses',
        userId: 'User ID',
        username: 'Username',
        createdAt: 'Created At',
        nickname: 'Nickname',
        email: 'Email',
        phone: 'Phone',
        gender: 'Gender',
        genderMale: 'Male',
        genderFemale: 'Female',
        genderOther: 'Other',
        birthDate: 'Birth Date',
        bio: 'Bio',
        createName: 'Create Name',
        displayName: 'Display Name',
        isDefaultDisplay: 'Default Display',
        totalPoints: 'Total Points',
        availablePoints: 'Available Points',
        frozenPoints: 'Frozen Points',
        consumedPoints: 'Consumed Points',
        vipLevel: 'VIP Level',
        vipPoints: 'VIP Points',
        totalEarnedPoints: 'Total Earned Points',
        vipStatus: 'VIP Status',
        roleId: 'Role ID',
        roleName: 'Role Name',
        roleCode: 'Role Code',
        isSystemRole: 'System Role',
        status: 'Status',
        historyId: 'History ID',
        oldDisplayName: 'Old Display Name',
        newDisplayName: 'New Display Name',
        changedAt: 'Changed At',
        feedbackId: 'ID',
        feedbackType: 'Type',
        feedbackContent: 'Content',
        feedbackStatus: 'Status',
        feedbackCreatedAt: 'Created At',
        licenseKey: 'License Key',
        licenseType: 'Type',
        licenseStatus: 'Status',
        licenseStartTime: 'Start Time',
        licenseEndTime: 'End Time',
        search: {
            userId: 'User ID',
            username: 'Username',
            userIdPlaceholder: 'Enter user ID',
            usernamePlaceholder: 'Enter username',
            selectOne: 'Please enter user ID or username to search'
        },
        messages: {
            loadFailed: 'Failed to get user details',
            userNotFound: 'User not found'
        }
    },
    profiles: {
        title: 'User Profiles Management',
        addProfile: 'Add Profile',
        editProfile: 'Edit Profile',
        columns: {
            profileId: 'Profile ID',
            userId: 'User ID',
            nickname: 'Nickname',
            email: 'Email',
            phone: 'Phone',
            gender: 'Gender',
            createdAt: 'Created At',
            action: 'Action'
        },
        search: {
            userId: 'User ID',
            nickname: 'Nickname',
            email: 'Email',
            userIdPlaceholder: 'Enter user ID',
            nicknamePlaceholder: 'Enter nickname',
            emailPlaceholder: 'Enter email'
        },
        form: {
            basicInfo: 'Basic Info (Required)',
            extraInfo: 'Extra Info (Optional)',
            userId: 'User ID',
            nickname: 'Nickname',
            email: 'Email',
            phone: 'Phone',
            avatarUrl: 'Avatar URL',
            birthDate: 'Birth Date',
            gender: 'Gender',
            bio: 'Bio',
            userIdPlaceholder: 'Enter user ID',
            nicknamePlaceholder: 'Enter nickname',
            emailPlaceholder: 'Enter email',
            phonePlaceholder: 'Enter phone',
            avatarUrlPlaceholder: 'Enter avatar URL',
            genderPlaceholder: 'Select gender',
            bioPlaceholder: 'Enter bio',
            validate: {
                userId: 'Please enter user ID'
            }
        },
        messages: {
            loadFailed: 'Failed to load data',
            createSuccess: 'Create successful',
            updateSuccess: 'Update successful',
            deleteSuccess: 'Delete successful',
            deleteFailed: 'Delete failed',
            saveFailed: 'Save failed'
        },
        confirm: {
            delete: {
                title: 'Confirm Delete',
                content: 'Are you sure to delete profile "{nickname}"?'
            }
        },
        pagination: {
            total: 'Total {total} items'
        },
        genderMale: 'Male',
        genderFemale: 'Female',
        genderOther: 'Other'
    },
    licenses: {
        title: 'License Management',
        assignLicense: 'Assign License',
        detailTitle: 'License Details',
        activationCode: 'Activation Code',
        columns: {
            licenseKey: 'License Key',
            userName: 'User Name',
            companyName: 'Company Name',
            contactEmail: 'Contact Email',
            licenseType: 'Type',
            status: 'Status',
            startTime: 'Start Time',
            endTime: 'End Time',
            productVersion: 'Product Version',
            maxConcurrentUsers: 'Max Concurrent Users',
            features: 'Features',
            remarks: 'Remarks',
            action: 'Action'
        },
        search: {
            licenseKey: 'License Key',
            licenseKeyPlaceholder: 'Enter license key'
        },
        form: {
            licenseKey: 'License Key',
            userId: 'User ID',
            licenseKeyPlaceholder: 'Enter license key',
            userIdPlaceholder: 'Enter user ID',
            validate: {
                required: 'Please fill in license key and user ID'
            }
        },
        type: {
            trial: 'Trial',
            standard: 'Standard',
            professional: 'Professional',
            enterprise: 'Enterprise'
        },
        status: {
            active: 'Active',
            expired: 'Expired',
            disabled: 'Disabled'
        },
        messages: {
            loadFailed: 'Failed to load data',
            enterLicenseKey: 'Please enter license key to search',
            notFound: 'License not found',
            disableSuccess: 'Disable successful',
            disableFailed: 'Disable failed',
            enableSuccess: 'Enable successful',
            enableFailed: 'Enable failed',
            generateCodeFailed: 'Failed to generate activation code',
            assignSuccess: 'Assign successful',
            assignFailed: 'Assign failed'
        },
        confirm: {
            disable: {
                title: 'Confirm Disable',
                content: 'Are you sure to disable license "{licenseKey}"?'
            }
        },
        pagination: {
            total: 'Total {total} items'
        }
    }
} as const
