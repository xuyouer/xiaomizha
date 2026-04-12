/**
 * 中文语言包
 */
export default {
    common: {
        confirm: '确定',
        cancel: '取消',
        save: '保存',
        delete: '删除',
        edit: '编辑',
        add: '新增',
        search: '搜索',
        reset: '重置',
        submit: '提交',
        back: '返回',
        loading: '加载中...',
        success: '操作成功',
        fail: '操作失败',
        refresh: '刷新',
        collapse: '收起',
        expand: '展开',
        total: '共 {total} 条',
    },
    nav: {
        home: '首页',
        about: '关于',
        login: '登录',
        register: '注册',
        logout: '退出登录',
        toRegister: '前往注册',
        toLogin: '前往登录',
    },
    menu: {
        title: '菜单',
    },
    app: {
        name: '小咪楂',
        title: '小咪楂后台管理系统',
        welcome: '欢迎使用',
        slogan: '小咪楂前端解决方案',
        subtitle: '高效、安全、智能的管理平台',
        copyright: '小咪楂. 保留所有权利.',
        userAgreement: '用户协议',
        privacyPolicy: '隐私政策',
        serviceAgreement: '产品服务协议',
        contactUs: '联系我们',
    },
    auth: {
        pleaseLogin: '请先登录',
        loginFailed: '获取用户信息失败，请重新登录',
        logoutSuccess: '已退出登录',
        welcomeBack: '欢迎回来',
        pleaseLoginAccount: '请登录您的账户',
        createdAccount: '创建账户',
        pleaseFillRegInfo: '请填写注册信息',
        username: '用户名',
        password: '密码',
        pleaseEnterUsername: '请输入用户名',
        pleaseEnterPassword: '请输入密码',
        pleaseReEnterPassword: '请二次输入密码',
        login: '登录',
        register: '注册',
        goRegister: '前往注册',
        goLogin: '前往登录',
        autoLogin: '自动登录',
        forgotPassword: '忘记密码',
        otherLoginWays: '其他登录方式',
        readAgreed: '我已阅读并同意',
    },
    userDropdown: {
        security: '账户安全',
        helpCenter: '帮助中心',
        about: '关于系统',
        comingSoon: '功能开发中，敬请期待',
    },
    admin: {
        dashboard: '仪表盘',
        system: '系统管理',
        userManage: '用户管理',
        userAssign: '用户分配',
        profilesManage: '用户资料管理',
        userDetailManage: '用户详情管理',
        roleManage: '角色管理',
        resourceManage: '资源管理',
        userNames: '用户名信息',
        userNameHistory: '用户名历史',
        vipLevelConfig: 'VIP等级配置',
        systemConfigs: '系统配置',
        userFeedback: '用户反馈',
        licensesManage: '许可证管理',
        licenseManage: '许可证管理',
        personalLicense: '个人许可证',
        allUsersLicenses: '用户许可证',
        profile: '个人管理',
        personalCenter: '个人中心',
        personalSettings: '个人设置',
        personalSecurity: '账户安全',
        user: '用户',
        signInManage: '签到管理',
        signInCenter: '签到中心',
        repairCardManage: '补签卡管理',
        pageTabs: {
            close: '关闭',
            closeOthers: '关闭其他',
            closeAll: '关闭全部'
        }
    },
    personalSecurity: {
        title: '账户安全',
        password: {
            title: '登录密码',
            description: '定期更换密码可以提高账户安全性',
            changePassword: '修改密码',
            currentPassword: '当前密码',
            newPassword: '新密码',
            confirmPassword: '确认新密码',
            currentPasswordPlaceholder: '请输入当前密码',
            newPasswordPlaceholder: '请输入新密码',
            confirmPasswordPlaceholder: '请再次输入新密码',
            passwordMinLength: '密码长度不能少于6位',
            passwordNotMatch: '两次输入的密码不一致',
            changeSuccess: '密码修改成功',
            changeFailed: '密码修改失败',
            currentPasswordError: '当前密码错误',
            lastChanged: '上次修改',
            neverChanged: '从未修改'
        },
        twoFactor: {
            title: '双因素认证',
            description: '开启双因素认证，为账户添加额外保护',
            enable: '开启',
            disable: '关闭',
            enabled: '已开启',
            disabled: '未开启',
            scanQrCode: '使用验证器应用扫描二维码',
            enterCode: '输入6位验证码',
            codePlaceholder: '请输入6位验证码',
            verifySuccess: '验证成功',
            verifyFailed: '验证失败',
            enableSuccess: '双因素认证已开启',
            disableSuccess: '双因素认证已关闭',
            disableConfirm: '关闭双因素认证会降低账户安全性，确定要关闭吗？'
        },
        loginHistory: {
            title: '登录历史',
            description: '查看最近的登录记录',
            viewAll: '查看全部',
            device: '设备',
            location: '位置',
            ip: 'IP地址',
            time: '登录时间',
            status: '状态',
            current: '当前设备',
            success: '成功',
            failed: '失败',
            noRecords: '暂无登录记录'
        },
        securityQuestions: {
            title: '安全问题',
            description: '设置安全问题用于找回密码',
            set: '设置',
            edit: '修改',
            question1: '问题一',
            question2: '问题二',
            question3: '问题三',
            answer: '答案',
            answerPlaceholder: '请输入答案',
            setSuccess: '安全问题设置成功',
            updateSuccess: '安全问题更新成功',
            questions: {
                petName: '您第一只宠物的名字是？',
                motherMaidenName: '您母亲的姓氏是？',
                birthCity: '您出生的城市是？',
                favoriteFood: '您最喜欢的食物是？',
                firstSchool: '您就读的第一所学校名称是？',
                favoriteMovie: '您最喜欢的电影是？',
                childhoodFriend: '您童年最好朋友的名字是？',
                favoriteBook: '您最喜欢的书是？'
            }
        },
        sessions: {
            title: '登录设备',
            description: '管理已登录的设备',
            currentDevice: '当前设备',
            lastActive: '最后活跃',
            logout: '退出登录',
            logoutAll: '退出所有其他设备',
            logoutConfirm: '确定要退出该设备吗？',
            logoutAllConfirm: '确定要退出所有其他设备吗？',
            logoutSuccess: '已退出登录',
            logoutAllSuccess: '已退出所有其他设备',
            noOtherDevices: '没有其他登录设备'
        },
        accountStatus: {
            title: '账户状态',
            normal: '正常',
            risk: '存在风险',
            locked: '已锁定',
            securityScore: '安全评分',
            suggestions: '安全建议',
            enableTwoFactor: '开启双因素认证',
            changePassword: '修改密码',
            setSecurityQuestions: '设置安全问题'
        }
    },
    theme: {
        light: '浅色',
        dark: '深色',
        primaryColor: '主题色',
    },
    dashboard: {
        totalUsers: '总用户数',
        totalRoles: '总角色数',
        totalResources: '总资源数',
        onlineUsers: '在线用户',
        systemInfo: '系统信息',
        systemName: '系统名称',
        version: '版本号',
        currentUser: '当前用户',
        loginTime: '登录时间',
        quickActions: '快速操作',
        userManagement: '用户管理',
        roleManagement: '角色管理',
        resourceManagement: '资源管理',
        signInCenter: '签到中心',
        loadStatsFailed: '加载统计数据失败',
        viewAll: '查看全部',
    },
    signIn: {
        signInStatus: '签到状态',
        todaySigned: '今日签到',
        signed: '已签到',
        notSigned: '未签到',
        signInNow: '立即签到',
        signingIn: '签到中...',
        viewOnly: '仅查看',
        continuousDays: '连续签到',
        day: '天',
        totalSignIns: '总签到次数',
        times: '次',
        maxContinuous: '最长连续',
        lastSignIn: '最后签到',
        tomorrowReward: '明日奖励',
        points: '积分',
        monthlyRecord: '月度签到记录',
        monthlySignIns: '本月签到',
        monthlyContinuous: '本月连续',
        monthlyPoints: '本月积分',
        pointsUnit: '分',
        ranking: '签到排行榜',
        totalSignInsRanking: '总签到次数',
        continuousDaysRanking: '连续签到天数',
        monthlySignInsRanking: '本月签到次数',
        rank: '排名',
        userId: '用户ID',
        getStatusFailed: '获取签到状态失败',
        signInFailed: '签到失败，请稍后重试',
        getMonthlyRecordFailed: '获取月度记录失败',
        getRankingFailed: '获取排行榜失败',
        repair: {
            title: '补签',
            repairCard: '补签卡',
            normalCard: '普通补签卡',
            advancedCard: '高级补签卡',
            cardCount: '补签卡数量',
            availableDates: '可补签日期',
            maxRepairDays: '最大可补签天数',
            repairNow: '立即补签',
            repairing: '补签中...',
            batchRepair: '批量补签',
            repairSuccess: '补签成功',
            repairFailed: '补签失败',
            noCard: '补签卡不足',
            alreadySigned: '该日期已签到',
            alreadyRepaired: '该日期已补签',
            dateTooOld: '超过可补签天数限制',
            futureDate: '不能补签未来的日期',
            preview: '补签预览',
            continuousBefore: '补签前连续天数',
            continuousAfter: '补签后连续天数',
            pointsReward: '预计获得积分',
            repairRecord: '补签记录',
            repairDate: '补签日期',
            cardType: '补签卡类型',
            status: '状态',
            repairTime: '补签时间',
            getRepairStatusFailed: '获取补签状态失败',
            getRepairPreviewFailed: '获取补签预览失败',
            getRepairRecordsFailed: '获取补签记录失败',
            confirmRepair: '确认补签',
            confirmRepairContent: '确定要使用1张补签卡补签{date}吗？',
            confirmBatchRepair: '确认批量补签',
            confirmBatchRepairContent: '确定要使用{count}张补签卡补签{dates}吗？',
            monthlyGrant: '每月发放',
            claimNormalCard: '领取普通补签卡',
            claimAdvancedCard: '领取高级补签卡',
            claimSuccess: '领取成功',
            claimFailed: '领取失败',
            alreadyClaimed: '本月已领取',
            cardSource: {
                monthly_grant: '每月发放',
                purchase: '购买',
                reward: '奖励',
                admin_grant: '管理员发放'
            },
            showMore: '展开更多 ({count}个)',
            noAvailableDates: '暂无可补签日期'
        }
    },
    repairCardManagement: {
        title: '补签卡管理',
        tabs: {
            cardInventory: '补签卡库存',
            grantRecords: '发放记录'
        },
        columns: {
            userId: '用户ID',
            username: '用户名',
            normalCard: '普通补签卡',
            advancedCard: '高级补签卡',
            totalCard: '总卡数',
            action: '操作',
            grantId: '记录ID',
            cardType: '卡类型',
            quantity: '数量',
            source: '来源',
            grantMonth: '发放月份',
            remark: '备注',
            createdAt: '发放时间'
        },
        cardTypes: {
            normal: '普通补签卡',
            advanced: '高级补签卡'
        },
        sources: {
            monthly_grant: '每月发放',
            purchase: '购买',
            reward: '奖励',
            admin_grant: '管理员发放'
        },
        actions: {
            grant: '发放'
        },
        modal: {
            grantTitle: '发放补签卡'
        },
        form: {
            userId: '用户',
            selectUser: '请选择用户',
            cardType: '补签卡类型',
            quantity: '数量',
            remark: '备注',
            remarkPlaceholder: '请输入备注（可选）'
        },
        searchPlaceholder: '搜索用户名或用户ID',
        messages: {
            loadFailed: '加载数据失败',
            loadUsersFailed: '加载用户列表失败',
            grantSuccess: '发放成功',
            grantFailed: '发放失败',
            selectUser: '请选择用户',
            invalidQuantity: '请输入有效数量'
        }
    },
    signInUserManagement: {
        title: '用户签到记录',
        columns: {
            userId: '用户ID',
            userName: '用户名',
            totalSignIns: '总签到次数',
            continuousDays: '连续签到',
            maxContinuousDays: '最长连续',
            monthlySignIns: '本月签到',
            pointsEarned: '累计积分',
            todaySigned: '今日状态',
            lastSignInDate: '最后签到时间',
            action: '操作'
        },
        search: {
            userIdPlaceholder: '请输入用户ID',
            userNamePlaceholder: '请输入用户名',
            monthPlaceholder: '选择月份',
            search: '搜索',
            reset: '重置'
        },
        action: {
            viewDetail: '详情',
            brief: '简讯'
        },
        detail: {
            title: '签到详情',
            monthlyRecord: '本月签到记录'
        },
        brief: {
            title: '签到简讯',
            monthlyRecord: '本月签到记录'
        },
        export: {
            button: '导出数据',
            title: '确认导出',
            content: '确定要导出当前筛选条件下的签到数据吗？',
            success: '导出成功',
            failed: '导出失败'
        },
        messages: {
            loadFailed: '加载数据失败'
        },
        pagination: {
            total: '共 {total} 条记录'
        }
    },
    home: {
        modernFrontend: '现代化的前端开发体验',
        frontendSolution: '基于 Vue 3 + TypeScript + Vite + Ant Design Vue 的前端解决方案',
        illustration: '插图',
        welcome: '欢迎访问',
        loginToUse: '登录后即可使用完整功能',
        login: '登录',
        enterAdmin: '进入管理后台',
        logout: '退出登录',
        guestUser: '访客用户',
        normalUser: '普通用户',
        logoutSuccess: '已退出登录',
    },
    about: {
        aboutProject: '关于项目',
        projectInfo: '项目信息',
        projectName: '项目名称',
        techStack: '技术栈',
        buildTool: '构建工具',
        uiLibrary: 'UI 组件库',
        router: '路由管理',
        techDescription: '技术说明',
        viteDesc: 'Vite - 下一代前端构建工具，提供极速的开发体验',
        vueDesc: 'Vue 3 - 渐进式 JavaScript 框架，使用 Composition API',
        tsDesc: 'TypeScript - 为 JavaScript 添加类型系统',
        antDesc: 'Ant Design Vue - 企业级 UI 设计语言和组件库',
        features: '功能特性',
        modernDev: '现代化开发',
        modernDevDesc: '使用 Vue 3 Composition API 和 TypeScript 提供类型安全的开发体验',
        fastBuild: '极速构建',
        fastBuildDesc: '基于 Vite 的开发服务器和构建工具，提供毫秒级的热更新',
        beautifulUi: '精美 UI',
        beautifulUiDesc: '集成 Ant Design Vue 组件库，提供丰富的 UI 组件和设计规范',
        secure: '安全可靠',
        secureDesc: '内置路由守卫和状态管理，提供安全的用户认证和权限控制',
    },
    error: {
        notFound: '页面不存在',
        errorDescription: '抱歉，您访问的页面可能已被删除、移动或输入了错误的地址。',
        back: '返回',
        goHome: '回到首页',
    },
    login: {
        pleaseEnterUsername: '请输入用户名',
        pleaseEnterPassword: '请输入密码',
        passwordMinLength: '密码长度不能少于6位',
        loginSuccess: '登录成功',
        loginFailed: '登录失败，请稍后重试',
        usernamePasswordError: '用户名或密码错误',
        githubLogin: 'GitHub登录',
        googleLogin: 'Google登录',
        qqLogin: 'QQ登录',
        wechatLogin: '微信登录',
        webcatxLogin: 'WebCatX登录',
    },
    register: {
        pleaseEnterUsername: '请输入用户名',
        usernameLength: '用户名长度为 2～32 个字符',
        pleaseEnterPassword: '请输入密码',
        passwordMinLength: '密码长度不能少于6位',
        pleaseReEnterPassword: '请再次输入密码',
        passwordNotMatch: '两次输入的密码不一致',
        pleaseAgree: '请阅读并同意相关协议',
        registerSuccess: '注册成功，请登录',
        registerFailed: '注册失败，请稍后重试',
        usernameExists: '注册失败: 用户名已存在或用户名已被禁用',
    },
    locale: {
        zhCN: '简体中文',
        zhTW: '繁體中文',
        enUS: 'English',
        ruRU: 'Русский',
    },
    resource: {
        management: {
            title: '资源管理',
            expandAll: '展开全部',
            collapseAll: '收起全部',
            addResource: '新增资源',
            edit: '编辑',
            delete: '删除',
            editResource: '编辑资源',
            columns: {
                resourceName: '资源名称',
                resourceCode: '资源代码',
                resourceCategory: '资源类型',
                sortOrder: '排序序号',
                status: '状态',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                extraInfo: '扩展信息（选填）',
                resourceName: '资源名称',
                resourceCode: '资源代码',
                resourceDescription: '资源描述',
                resourceCategory: '资源类型',
                resourcePath: '资源路径',
                parentId: '父级资源',
                level: '资源层级',
                sortOrder: '排序序号',
                status: '状态',
                createBy: '创建人用户ID',
                updateBy: '更新人用户ID',
                resourceComponent: '组件路径',
                resourceIcon: '资源图标',
                visible: '是否可见',
                isSystem: '是否系统内置资源',
                permissionFlag: '权限标识',
                requiresAuth: '是否需要认证',
                keepAlive: '是否缓存页面',
                externalLink: '是否外部链接',
                target: '链接打开方式',
                badge: '徽章内容',
                badgeType: '徽章类型',
                metaJson: '元数据(JSON)',
                catalog: '目录',
                menu: '菜单',
                button: '按钮',
                api: '接口',
                page: '页面',
                module: '模块',
                other: '其它',
                none: '无',
                validate: {
                    resourceName: '请输入资源名称',
                    resourceCategory: '请选择资源类型',
                    status: '请选择状态'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除资源 "{resourceName}" 吗？'
                }
            }
        },
        common: {
            enabled: '启用',
            disabled: '禁用',
            visible: '可见',
            hidden: '隐藏',
            yes: '是',
            no: '否'
        }
    },
    role: {
        management: {
            title: '角色管理',
            addRole: '新增角色',
            edit: '编辑',
            delete: '删除',
            editRole: '编辑角色',
            columns: {
                roleId: '角色ID',
                roleName: '角色名称',
                roleCode: '角色代码',
                roleDescription: '角色描述',
                isSystemRole: '系统角色',
                isDefault: '默认角色',
                sortOrder: '排序序号',
                status: '状态',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                extraInfo: '扩展信息（选填）',
                roleName: '角色名称',
                roleCode: '角色代码',
                roleDescription: '角色描述',
                sortOrder: '排序序号',
                status: '状态',
                isSystemRole: '系统角色',
                isDefault: '默认角色',
                validate: {
                    roleName: '请输入角色名称',
                    status: '请选择状态'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除角色 "{roleName}" 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        },
        common: {
            enabled: '启用',
            disabled: '禁用',
            systemRole: '系统角色',
            normalRole: '普通角色',
            yes: '是',
            no: '否'
        }
    },
    systemConfig: {
        management: {
            title: '系统配置',
            add: '新增',
            edit: '编辑',
            delete: '删除',
            columns: {
                id: 'ID',
                configKey: '配置键',
                configValue: '配置值',
                configType: '类型',
                description: '描述',
                isPublic: '公开',
                createdAt: '创建时间',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                extraInfo: '扩展信息（选填）',
                configKey: '配置键',
                configValue: '配置值',
                configType: '配置类型',
                description: '描述',
                isPublic: '公开配置',
                configKeyPlaceholder: '唯一键，如 app.name',
                validate: {
                    configKey: '请输入配置键',
                    configValue: '请输入配置值',
                    configType: '请选择类型'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除配置 "{configKey}" 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        },
        common: {
            yes: '是',
            no: '否'
        }
    },
    userFeedback: {
        management: {
            title: '用户反馈',
            add: '新增',
            edit: '编辑',
            delete: '删除',
            columns: {
                id: 'ID',
                userId: '用户ID',
                type: '类型',
                content: '内容',
                status: '状态',
                createdAt: '创建时间',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                extraInfo: '扩展信息（选填）',
                userId: '用户ID',
                type: '反馈类型',
                content: '反馈内容',
                status: '状态',
                contactInfo: '联系方式',
                reply: '回复内容',
                validate: {
                    userId: '请输入用户ID',
                    type: '请选择反馈类型',
                    content: '请输入反馈内容',
                    status: '请选择状态'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除反馈 #{id} 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        },
        common: {
            type: {
                systemIssue: '系统问题',
                featureSuggestion: '功能建议',
                bugReport: 'BUG反馈',
                other: '其他'
            },
            status: {
                pending: '待处理',
                accepted: '已受理',
                resolved: '已解决',
                closed: '已关闭'
            }
        }
    },
    userManagement: {
        title: '用户管理',
        addUser: '新增用户',
        edit: '编辑',
        delete: '删除',
        editUser: '编辑用户',
        detail: '详情',
        columns: {
            userId: '用户ID',
            username: '用户名',
            accountStatus: '账户状态',
            createdAt: '创建时间',
            action: '操作'
        },
        form: {
            basicInfo: '基本信息（必填）',
            username: '用户名',
            password: '密码',
            resetPassword: '重置密码',
            resetPasswordPlaceholder: '留空则不修改密码',
            accountStatus: '账户状态',
            randomUsername: '随机生成用户名',
            randomPassword: '随机生成密码',
            validate: {
                username: '请输入用户名',
                password: '请输入密码',
                accountStatus: '请选择账户状态'
            }
        },
        messages: {
            loadFailed: '加载数据失败',
            deleteSuccess: '注销成功',
            deleteFailed: '注销失败',
            updateSuccess: '更新成功',
            registerSuccess: '注册成功'
        },
        confirm: {
            delete: {
                title: '确认注销',
                content: '确定要注销用户 "{username}" 吗？'
            }
        },
        status: {
            normal: '正常',
            disabled: '禁用'
        },
        pagination: {
            total: '共 {total} 条'
        }
    },
    userAssign: {
        title: '用户分配管理',
        searchPlaceholder: '搜索用户名或用户ID',
        assign: '分配',
        assignRoles: '分配角色',
        assignResources: '分配资源',
        assignVip: '分配VIP',
        assignPoints: '分配积分',
        assignLicense: '分配许可证',
        columns: {
            userId: '用户ID',
            username: '用户名',
            accountStatus: '状态',
            createdAt: '创建时间',
            action: '操作'
        },
        status: {
            normal: '正常',
            disabled: '禁用'
        },
        extraInfo: {
            userId: '用户ID',
            username: '用户名',
            roles: '当前角色',
            vipLevel: 'VIP等级',
            points: '当前积分',
            accountStatus: '账户状态'
        },
        form: {
            basicInfo: '基本信息（必填）',
            extraInfo: '扩展信息（选填）',
            userId: '用户ID',
            username: '用户名',
            selectRoles: '选择角色',
            selectRolesPlaceholder: '请选择要分配的角色',
            selectResources: '选择资源',
            selectResourcesPlaceholder: '请选择要分配的资源',
            vipLevel: 'VIP等级',
            selectVipPlaceholder: '请选择VIP等级',
            vipExpireTime: '过期时间',
            vipExpireTimePlaceholder: '请选择过期时间',
            pointsType: '操作类型',
            pointsAdd: '增加积分',
            pointsSubtract: '扣除积分',
            pointsSet: '设置为',
            pointsAmount: '积分数量',
            pointsAmountPlaceholder: '请输入积分数量',
            pointsReason: '操作原因',
            pointsReasonPlaceholder: '请输入操作原因',
            licenseType: '许可证类型',
            selectLicense: '选择许可证',
            selectLicensePlaceholder: '请选择许可证',
            licenseDuration: '有效期',
            licenseDurationPlaceholder: '请输入有效天数',
            licenseReason: '分配原因',
            licenseReasonPlaceholder: '请输入分配原因',
            days: '天',
            validate: {
                roleIds: '请选择角色',
                resourceIds: '请选择资源',
                vipLevel: '请选择VIP等级',
                pointsAmount: '请输入积分数量',
                pointsReason: '请输入操作原因',
                licenseType: '请选择许可证类型',
                licenseDuration: '请输入有效天数'
            }
        },
        messages: {
            loadFailed: '加载数据失败',
            loadDetailFailed: '加载用户详情失败',
            loadRoleFailed: '加载角色列表失败',
            loadResourceFailed: '加载资源列表失败',
            loadVipFailed: '加载VIP等级列表失败',
            loadLicenseFailed: '加载许可证列表失败',
            noChanges: '没有需要更新的内容',
            assignSuccess: '分配成功',
            assignRolesSuccess: '角色分配成功',
            assignResourcesSuccess: '资源分配成功',
            assignVipSuccess: 'VIP分配成功',
            assignPointsSuccess: '积分分配成功',
            assignLicenseSuccess: '许可证分配成功'
        },
        pagination: {
            total: '共 {total} 条'
        }
    },
    userNameHistory: {
        management: {
            title: '用户名变更历史',
            add: '新增',
            edit: '编辑',
            delete: '删除',
            columns: {
                historyId: '历史ID',
                userId: '用户ID',
                oldDisplayName: '原显示名称',
                newDisplayName: '新显示名称',
                changedBy: '修改人',
                changedAt: '修改时间',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                userId: '用户ID',
                oldDisplayName: '原显示名称',
                newDisplayName: '新显示名称',
                changedBy: '修改人用户ID',
                createdBy: '新增人用户ID',
                randomNewDisplayName: '随机生成新显示名称',
                validate: {
                    userId: '请输入用户ID',
                    oldDisplayName: '请输入原显示名称',
                    newDisplayName: '请输入新显示名称'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除历史记录 #{historyId} 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        }
    },
    userNames: {
        management: {
            title: '用户名信息管理',
            add: '新增',
            edit: '编辑',
            delete: '删除',
            columns: {
                nameId: '名称ID',
                userId: '用户ID',
                createName: '创建用户名',
                displayName: '显示名称',
                isDefaultDisplay: '默认显示',
                createdAt: '创建时间',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                userId: '用户ID',
                createName: '创建用户名',
                displayName: '显示名称',
                isDefaultDisplay: '默认显示',
                randomCreateName: '随机生成创建用户名',
                randomDisplayName: '随机生成显示名称',
                validate: {
                    userId: '请输入用户ID',
                    createName: '请输入创建用户名',
                    displayName: '请输入显示名称',
                    isDefaultDisplay: '请选择'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除用户名 "{displayName}" 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        },
        common: {
            yes: '是',
            no: '否'
        }
    },
    vipLevel: {
        management: {
            title: 'VIP等级配置',
            add: '新增',
            edit: '编辑',
            delete: '删除',
            columns: {
                levelId: '等级ID',
                vipLevel: 'VIP等级',
                levelName: '等级名称',
                minPoints: '最小成长值',
                maxPoints: '最大成长值',
                dailyPointsLimit: '每日上限',
                monthlyPointsLimit: '每月上限',
                status: '状态',
                createdAt: '创建时间',
                action: '操作'
            },
            form: {
                basicInfo: '基本信息（必填）',
                extraInfo: '扩展信息（选填）',
                vipLevel: 'VIP等级',
                levelName: '等级名称',
                minPoints: '最小成长值',
                maxPoints: '最大成长值',
                dailyPointsLimit: '每日上限',
                monthlyPointsLimit: '每月上限',
                status: '状态',
                iconUrl: '图标URL',
                badgeColor: '徽章颜色',
                benefitsJson: '权益配置(JSON)',
                maxPointsPlaceholder: '空表示无上限',
                iconUrlPlaceholder: '图标链接地址',
                badgeColorPlaceholder: '#hex 或 颜色名',
                benefitsJsonPlaceholder: 'JSON格式，如: {"discount": 0.9, "freeShipping": true}',
                validate: {
                    vipLevel: '请输入VIP等级',
                    levelName: '请输入等级名称',
                    minPoints: '请输入最小成长值',
                    dailyPointsLimit: '请输入每日上限',
                    monthlyPointsLimit: '请输入每月上限',
                    status: '请选择状态'
                }
            },
            messages: {
                loadFailed: '加载数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除等级 "{levelName}" 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条'
            }
        },
        common: {
            enabled: '启用',
            disabled: '禁用'
        }
    },
    userDetail: {
        title: '用户详情管理',
        noData: '请搜索用户以查看详情',
        basicInfo: '基本信息',
        profileInfo: '个人资料',
        nameInfo: '用户名信息',
        pointsInfo: '积分信息',
        vipInfo: 'VIP信息',
        rolesInfo: '角色信息',
        nameHistory: '用户名变更历史',
        feedbackInfo: '用户反馈记录',
        licenseInfo: '用户许可证',
        userId: '用户ID',
        username: '用户名',
        createdAt: '创建时间',
        nickname: '昵称',
        email: '邮箱',
        phone: '手机号',
        gender: '性别',
        genderMale: '男',
        genderFemale: '女',
        genderOther: '其他',
        birthDate: '生日',
        bio: '个人简介',
        createName: '创建用户名',
        displayName: '显示名称',
        isDefaultDisplay: '默认显示',
        totalPoints: '总积分',
        availablePoints: '可用积分',
        frozenPoints: '冻结积分',
        consumedPoints: '已消费积分',
        vipLevel: 'VIP等级',
        vipPoints: 'VIP积分',
        totalEarnedPoints: '累计获得积分',
        vipStatus: 'VIP状态',
        roleId: '角色ID',
        roleName: '角色名称',
        roleCode: '角色代码',
        isSystemRole: '系统角色',
        status: '状态',
        historyId: '历史ID',
        oldDisplayName: '原显示名称',
        newDisplayName: '新显示名称',
        changedAt: '修改时间',
        feedbackId: 'ID',
        feedbackType: '类型',
        feedbackContent: '内容',
        feedbackStatus: '状态',
        feedbackCreatedAt: '创建时间',
        licenseKey: '许可证密钥',
        licenseType: '类型',
        licenseStatus: '状态',
        licenseStartTime: '开始时间',
        licenseEndTime: '结束时间',
        search: {
            userId: '用户ID',
            username: '用户名',
            userIdPlaceholder: '请输入用户ID',
            usernamePlaceholder: '请输入用户名',
            selectOne: '请输入用户ID或用户名进行搜索'
        },
        messages: {
            loadFailed: '获取用户详情失败',
            userNotFound: '用户不存在'
        }
    },
    profiles: {
        title: '用户资料管理',
        addProfile: '新增资料',
        editProfile: '编辑资料',
        columns: {
            profileId: '资料ID',
            userId: '用户ID',
            nickname: '昵称',
            email: '邮箱',
            phone: '手机号',
            gender: '性别',
            createdAt: '创建时间',
            action: '操作'
        },
        search: {
            userId: '用户ID',
            nickname: '昵称',
            email: '邮箱',
            userIdPlaceholder: '请输入用户ID',
            nicknamePlaceholder: '请输入昵称',
            emailPlaceholder: '请输入邮箱'
        },
        form: {
            basicInfo: '基本信息（必填）',
            extraInfo: '扩展信息（选填）',
            userId: '用户ID',
            nickname: '昵称',
            email: '邮箱',
            phone: '手机号',
            avatarUrl: '头像URL',
            birthDate: '生日',
            gender: '性别',
            bio: '个人简介',
            userIdPlaceholder: '请输入用户ID',
            nicknamePlaceholder: '请输入昵称',
            emailPlaceholder: '请输入邮箱',
            phonePlaceholder: '请输入手机号',
            avatarUrlPlaceholder: '请输入头像URL',
            genderPlaceholder: '请选择性别',
            bioPlaceholder: '请输入个人简介',
            validate: {
                userId: '请输入用户ID'
            }
        },
        messages: {
            loadFailed: '加载数据失败',
            createSuccess: '新增成功',
            updateSuccess: '更新成功',
            deleteSuccess: '删除成功',
            deleteFailed: '删除失败',
            saveFailed: '保存失败'
        },
        confirm: {
            delete: {
                title: '确认删除',
                content: '确定要删除资料 "{nickname}" 吗？'
            }
        },
        pagination: {
            total: '共 {total} 条'
        },
        genderMale: '男',
        genderFemale: '女',
        genderOther: '其他'
    },
    licenses: {
        title: '许可证管理',
        assignLicense: '分配许可证',
        detailTitle: '许可证详情',
        activationCode: '激活码',
        columns: {
            licenseKey: '许可证密钥',
            licenseId: '许可证ID',
            userName: '用户名',
            companyName: '公司名称',
            contactEmail: '联系邮箱',
            licenseType: '类型',
            status: '状态',
            startTime: '开始时间',
            endTime: '结束时间',
            productVersion: '产品版本',
            maxConcurrentUsers: '最大并发用户',
            allowOffline: '允许离线',
            features: '功能',
            remarks: '备注',
            hardwareInfo: '硬件信息',
            activationCode: '激活码',
            lastActivationTime: '最后激活时间',
            createdBy: '创建者',
            action: '操作'
        },
        search: {
            licenseKey: '许可证密钥',
            licenseKeyPlaceholder: '请输入许可证密钥'
        },
        form: {
            licenseKey: '许可证密钥',
            userId: '用户ID',
            licenseKeyPlaceholder: '请输入许可证密钥',
            userIdPlaceholder: '请输入用户ID',
            validate: {
                required: '请填写许可证密钥和用户ID'
            }
        },
        type: {
            trial: '试用版',
            basic: '基础版',
            premium: '高级版',
            standard: '标准版',
            professional: '专业版',
            enterprise: '企业版',
            custom: '定制版'
        },
        status: {
            active: '有效',
            expired: '已过期',
            revoked: '已撤销',
            inactive: '未激活',
            suspended: '已暂停'
        },
        messages: {
            loadFailed: '加载数据失败',
            enterLicenseKey: '请输入许可证密钥进行搜索',
            notFound: '未找到许可证',
            disableSuccess: '禁用成功',
            disableFailed: '禁用失败',
            enableSuccess: '启用成功',
            enableFailed: '启用失败',
            generateCodeFailed: '生成激活码失败',
            assignSuccess: '分配成功',
            assignFailed: '分配失败'
        },
        confirm: {
            disable: {
                title: '确认禁用',
                content: '确定要禁用许可证 "{licenseKey}" 吗？'
            }
        },
        pagination: {
            total: '共 {total} 条'
        },
        personal: {
            title: '个人许可证',
            description: '查看当前用户或指定许可证的详细信息',
            noData: '暂无许可证数据',
            backToList: '返回列表',
            applyTrial: '申请试用',
            applyTrialSuccess: '试用许可证申请成功',
            applyTrialFailed: '试用许可证申请失败，请稍后重试'
        },
        userManagement: {
            title: '用户许可证',
            columns: {
                licenseKey: '许可证密钥',
                userName: '用户名',
                companyName: '公司名称',
                contactEmail: '联系邮箱',
                licenseType: '许可证类型',
                status: '状态',
                startTime: '开始时间',
                endTime: '结束时间',
                productVersion: '产品版本',
                maxConcurrentUsers: '最大并发用户数',
                features: '功能',
                remarks: '备注',
                action: '操作'
            },
            search: {
                licenseKey: '许可证密钥',
                licenseKeyPlaceholder: '请输入许可证密钥',
                search: '搜索',
                reset: '重置'
            },
            action: {
                detail: '详情',
                edit: '编辑',
                delete: '删除'
            },
            form: {
                addTitle: '新增许可证关联',
                editTitle: '编辑许可证信息',
                licenseKey: '许可证密钥',
                userId: '用户ID',
                licenseKeyPlaceholder: '请输入许可证密钥',
                userIdPlaceholder: '请输入用户ID'
            },
            messages: {
                loadFailed: '加载许可证数据失败',
                deleteSuccess: '删除成功',
                deleteFailed: '删除失败',
                saveSuccess: '保存成功',
                saveFailed: '保存失败'
            },
            confirm: {
                delete: {
                    title: '确认删除',
                    content: '确定要删除许可证 "{licenseKey}" 吗？'
                }
            },
            pagination: {
                total: '共 {total} 条记录'
            }
        }
    },
    licensesManagement: {
        title: '许可证管理',
        columns: {
            assignedUsers: '分配用户'
        },
        search: {
            licenseTypePlaceholder: '许可证类型',
            statusPlaceholder: '状态'
        },
        action: {
            viewUsers: '查看用户',
            disable: '禁用',
            enable: '启用'
        },
        form: {
            editTitle: '编辑许可证',
            basicInfo: '基本信息',
            extendedInfo: '扩展信息',
            assignedUsers: '已分配用户',
            userNamePlaceholder: '请输入用户名',
            companyNamePlaceholder: '请输入公司名称',
            productVersionPlaceholder: '请输入产品版本',
            contactEmailPlaceholder: '请输入联系邮箱',
            hardwareInfoPlaceholder: '请输入硬件绑定信息',
            activationCodePlaceholder: '请输入激活码',
            selectLicenseType: '请选择许可证类型',
            selectStatus: '请选择状态',
            selectStartTime: '请选择开始时间',
            selectEndTime: '请选择结束时间',
            selectAllowOffline: '请选择是否允许离线',
            offlineDisabled: '不允许',
            offlineEnabled: '允许',
            maxConcurrentUsersPlaceholder: '请输入最大并发用户数',
            featuresPlaceholder: '请输入功能配置',
            remarksPlaceholder: '请输入备注',
            validate: {
                userName: '请输入用户名',
                companyName: '请输入公司名称',
                productVersion: '请输入产品版本',
                licenseType: '请选择许可证类型',
                status: '请选择状态'
            }
        },
        confirm: {
            disable: {
                title: '确认禁用',
                content: '确定要禁用许可证 "{licenseKey}" 吗？'
            },
            enable: {
                title: '确认启用',
                content: '确定要启用许可证 "{licenseKey}" 吗？'
            },
            delete: {
                title: '确认删除',
                content: '确定要删除许可证 "{licenseKey}" 及其所有关联吗？'
            }
        },
        messages: {
            deleteSuccess: '删除成功',
            deleteFailed: '删除失败'
        },
        modal: {
            assignedUsersTitle: '已分配用户',
            noAssignedUsers: '暂无已分配用户',
            userId: '用户ID',
            status: '状态',
            assignedAt: '分配时间'
        }
    },
    licensesUserManagement: {
        title: '用户许可证',
        columns: {
            userId: '用户ID',
            username: '用户名',
            accountStatus: '账户状态',
            licenseCount: '许可证数量',
            createdAt: '创建时间'
        },
        search: {
            keywordPlaceholder: '搜索用户名或用户ID'
        },
        action: {
            assignLicense: '分配许可证',
            addLicense: '添加许可证',
            remove: '移除'
        },
        confirm: {
            remove: {
                title: '确认移除',
                content: '确定要移除用户 "{username}" 的许可证 "{licenseKey}" 吗？'
            }
        },
        messages: {
            loadFailed: '加载数据失败',
            removeSuccess: '移除成功',
            removeFailed: '移除失败'
        },
        noLicenses: '该用户暂无许可证'
    }
} as const
