/**
 * 中文語言包
 */
export default {
    common: {
        confirm: '確定',
        cancel: '取消',
        save: '儲存',
        delete: '刪除',
        edit: '編輯',
        add: '新增',
        search: '搜尋',
        reset: '重置',
        submit: '提交',
        back: '返回',
        loading: '載入中...',
        success: '操作成功',
        fail: '操作失敗',
        refresh: '重新整理',
        collapse: '收起',
        expand: '展開',
        total: '共 {total} 條',
    },
    nav: {
        home: '首頁',
        about: '關於',
        login: '登入',
        register: '註冊',
        logout: '登出',
        toRegister: '前往註冊',
        toLogin: '前往登入',
    },
    menu: {
        title: '菜單',
    },
    app: {
        name: '小咪楂',
        title: '小咪楂後台管理系統',
        welcome: '歡迎使用',
        slogan: '小咪楂前端解決方案',
        subtitle: '高效、安全、智能的管理平台',
        copyright: '小咪楂. 保留所有權利.',
        userAgreement: '使用者協議',
        privacyPolicy: '隱私政策',
        serviceAgreement: '產品服務協議',
        contactUs: '聯繫我們',
    },
    auth: {
        pleaseLogin: '請先登入',
        loginFailed: '獲取用戶資訊失敗，請重新登入',
        logoutSuccess: '已登出',
        welcomeBack: '歡迎回來',
        pleaseLoginAccount: '請登入您的帳戶',
        createdAccount: '建立帳戶',
        pleaseFillRegInfo: '請填寫註冊資訊',
        username: '使用者名稱',
        password: '密碼',
        pleaseEnterUsername: '請輸入使用者名稱',
        pleaseEnterPassword: '請輸入密碼',
        pleaseReEnterPassword: '請再次輸入密碼',
        login: '登入',
        register: '註冊',
        goRegister: '前往註冊',
        goLogin: '前往登入',
        autoLogin: '自動登入',
        forgotPassword: '忘記密碼',
        otherLoginWays: '其他登入方式',
        readAgreed: '我已閱讀並同意',
    },
    userDropdown: {
        security: '帳戶安全',
        helpCenter: '幫助中心',
        about: '關於系統',
        comingSoon: '功能開發中，敬請期待',
    },
    admin: {
        dashboard: '儀表板',
        system: '系統管理',
        userManage: '使用者管理',
        userAssign: '使用者分配',
        profilesManage: '使用者資料管理',
        userDetailManage: '使用者詳情管理',
        roleManage: '角色管理',
        resourceManage: '資源管理',
        userNames: '使用者名稱資訊',
        userNameHistory: '使用者名稱歷史',
        vipLevelConfig: 'VIP等級設定',
        systemConfigs: '系統設定',
        userFeedback: '使用者回饋',
        licensesManage: '授權管理',
        licenseManage: '授權管理',
        personalLicense: '個人授權',
        allUsersLicenses: '使用者授權',
        profile: '個人管理',
        personalCenter: '個人中心',
        personalSettings: '個人設定',
        personalSecurity: '帳戶安全',
        user: '使用者',
        signInManage: '簽到管理',
        signInCenter: '簽到中心',
        repairCardManage: '補簽卡管理',
        pageTabs: {
            close: '關閉',
            closeOthers: '關閉其他',
            closeAll: '關閉全部'
        }
    },
    personalSecurity: {
        title: '帳戶安全',
        password: {
            title: '登入密碼',
            description: '定期更換密碼可以提高帳戶安全性',
            changePassword: '修改密碼',
            currentPassword: '目前密碼',
            newPassword: '新密碼',
            confirmPassword: '確認新密碼',
            currentPasswordPlaceholder: '請輸入目前密碼',
            newPasswordPlaceholder: '請輸入新密碼',
            confirmPasswordPlaceholder: '請再次輸入新密碼',
            passwordMinLength: '密碼長度不能少於6位',
            passwordNotMatch: '兩次輸入的密碼不一致',
            changeSuccess: '密碼修改成功',
            changeFailed: '密碼修改失敗',
            currentPasswordError: '目前密碼錯誤',
            lastChanged: '上次修改',
            neverChanged: '從未修改'
        },
        twoFactor: {
            title: '雙重驗證',
            description: '開啟雙重驗證，為帳戶添加額外保護',
            enable: '開啟',
            disable: '關閉',
            enabled: '已開啟',
            disabled: '未開啟',
            scanQrCode: '使用驗證器應用程式掃描二維碼',
            enterCode: '輸入6位驗證碼',
            codePlaceholder: '請輸入6位驗證碼',
            verifySuccess: '驗證成功',
            verifyFailed: '驗證失敗',
            enableSuccess: '雙重驗證已開啟',
            disableSuccess: '雙重驗證已關閉',
            disableConfirm: '關閉雙重驗證會降低帳戶安全性，確定要關閉嗎？'
        },
        loginHistory: {
            title: '登入歷史',
            description: '查看最近的登入記錄',
            viewAll: '查看全部',
            device: '裝置',
            location: '位置',
            ip: 'IP位址',
            time: '登入時間',
            status: '狀態',
            current: '目前裝置',
            success: '成功',
            failed: '失敗',
            noRecords: '暫無登入記錄'
        },
        securityQuestions: {
            title: '安全問題',
            description: '設定安全問題用於找回密碼',
            set: '設定',
            edit: '修改',
            question1: '問題一',
            question2: '問題二',
            question3: '問題三',
            answer: '答案',
            answerPlaceholder: '請輸入答案',
            setSuccess: '安全問題設定成功',
            updateSuccess: '安全問題更新成功',
            questions: {
                petName: '您第一隻寵物的名字是？',
                motherMaidenName: '您母親的姓氏是？',
                birthCity: '您出生的城市是？',
                favoriteFood: '您最喜歡的食物是？',
                firstSchool: '您就讀的第一所學校名稱是？',
                favoriteMovie: '您最喜歡的電影是？',
                childhoodFriend: '您童年最好朋友的名字是？',
                favoriteBook: '您最喜歡的書是？'
            }
        },
        sessions: {
            title: '登入裝置',
            description: '管理已登入的裝置',
            currentDevice: '目前裝置',
            lastActive: '最後活躍',
            logout: '登出',
            logoutAll: '登出所有其他裝置',
            logoutConfirm: '確定要登出該裝置嗎？',
            logoutAllConfirm: '確定要登出所有其他裝置嗎？',
            logoutSuccess: '已登出',
            logoutAllSuccess: '已登出所有其他裝置',
            noOtherDevices: '沒有其他登入裝置'
        },
        accountStatus: {
            title: '帳戶狀態',
            normal: '正常',
            risk: '存在風險',
            locked: '已鎖定',
            securityScore: '安全評分',
            suggestions: '安全建議',
            enableTwoFactor: '開啟雙重驗證',
            changePassword: '修改密碼',
            setSecurityQuestions: '設定安全問題'
        }
    },
    theme: {
        light: '淺色',
        dark: '深色',
        primaryColor: '主題色',
    },
    dashboard: {
        totalUsers: '總使用者數',
        totalRoles: '總角色數',
        totalResources: '總資源數',
        onlineUsers: '線上使用者',
        systemInfo: '系統資訊',
        systemName: '系統名稱',
        version: '版本號',
        currentUser: '目前使用者',
        loginTime: '登入時間',
        quickActions: '快速操作',
        userManagement: '使用者管理',
        roleManagement: '角色管理',
        resourceManagement: '資源管理',
        signInCenter: '簽到中心',
        loadStatsFailed: '載入統計資料失敗',
        viewAll: '查看全部',
    },
    signIn: {
        signInStatus: '簽到狀態',
        todaySigned: '今日簽到',
        signed: '已簽到',
        notSigned: '未簽到',
        signInNow: '立即簽到',
        signingIn: '簽到中...',
        viewOnly: '僅查看',
        continuousDays: '連續簽到',
        day: '天',
        totalSignIns: '總簽到次數',
        times: '次',
        maxContinuous: '最長連續',
        lastSignIn: '最後簽到',
        tomorrowReward: '明日獎勵',
        points: '積分',
        monthlyRecord: '月度簽到記錄',
        monthlySignIns: '本月簽到',
        monthlyContinuous: '本月連續',
        monthlyPoints: '本月積分',
        pointsUnit: '分',
        ranking: '簽到排行榜',
        totalSignInsRanking: '總簽到次數',
        continuousDaysRanking: '連續簽到天數',
        monthlySignInsRanking: '本月簽到次數',
        rank: '排名',
        userId: '使用者ID',
        getStatusFailed: '獲取簽到狀態失敗',
        signInFailed: '簽到失敗，請稍後重試',
        getMonthlyRecordFailed: '獲取月度記錄失敗',
        getRankingFailed: '獲取排行榜失敗',
        repair: {
            title: '補簽',
            repairCard: '補簽卡',
            normalCard: '普通補簽卡',
            advancedCard: '高級補簽卡',
            cardCount: '補簽卡數量',
            availableDates: '可補簽日期',
            maxRepairDays: '最大可補簽天數',
            repairNow: '立即補簽',
            repairing: '補簽中...',
            batchRepair: '批量補簽',
            repairSuccess: '補簽成功',
            repairFailed: '補簽失敗',
            noCard: '補簽卡不足',
            alreadySigned: '該日期已簽到',
            alreadyRepaired: '該日期已補簽',
            dateTooOld: '超過可補簽天數限制',
            futureDate: '不能補簽未來的日期',
            preview: '補簽預覽',
            continuousBefore: '補簽前連續天數',
            continuousAfter: '補簽後連續天數',
            pointsReward: '預計獲得積分',
            repairRecord: '補簽記錄',
            repairDate: '補簽日期',
            cardType: '補簽卡類型',
            status: '狀態',
            repairTime: '補簽時間',
            getRepairStatusFailed: '獲取補簽狀態失敗',
            getRepairPreviewFailed: '獲取補簽預覽失敗',
            getRepairRecordsFailed: '獲取補簽記錄失敗',
            confirmRepair: '確認補簽',
            confirmRepairContent: '確定要使用1張補簽卡補簽{date}嗎？',
            confirmBatchRepair: '確認批量補簽',
            confirmBatchRepairContent: '確定要使用{count}張補簽卡補簽{dates}嗎？',
            monthlyGrant: '每月發放',
            claimNormalCard: '領取普通補簽卡',
            claimAdvancedCard: '領取高級補簽卡',
            claimSuccess: '領取成功',
            claimFailed: '領取失敗',
            alreadyClaimed: '本月已領取',
            cardSource: {
                monthly_grant: '每月發放',
                purchase: '購買',
                reward: '獎勵',
                admin_grant: '管理員發放'
            },
            showMore: '展開更多 ({count}個)',
            noAvailableDates: '暫無可補簽日期'
        }
    },
    repairCardManagement: {
        title: '補簽卡管理',
        tabs: {
            cardInventory: '補簽卡庫存',
            grantRecords: '發放記錄'
        },
        columns: {
            userId: '用戶ID',
            username: '用戶名',
            normalCard: '普通補簽卡',
            advancedCard: '高級補簽卡',
            totalCard: '總卡數',
            action: '操作',
            grantId: '記錄ID',
            cardType: '卡類型',
            quantity: '數量',
            source: '來源',
            grantMonth: '發放月份',
            remark: '備註',
            createdAt: '發放時間'
        },
        cardTypes: {
            normal: '普通補簽卡',
            advanced: '高級補簽卡'
        },
        sources: {
            monthly_grant: '每月發放',
            purchase: '購買',
            reward: '獎勵',
            admin_grant: '管理員發放'
        },
        actions: {
            grant: '發放'
        },
        modal: {
            grantTitle: '發放補簽卡'
        },
        form: {
            userId: '用戶',
            selectUser: '請選擇用戶',
            cardType: '補簽卡類型',
            quantity: '數量',
            remark: '備註',
            remarkPlaceholder: '請輸入備註（可選）'
        },
        searchPlaceholder: '搜索用戶名或用戶ID',
        messages: {
            loadFailed: '載入資料失敗',
            loadUsersFailed: '載入用戶列表失敗',
            grantSuccess: '發放成功',
            grantFailed: '發放失敗',
            selectUser: '請選擇用戶',
            invalidQuantity: '請輸入有效數量'
        }
    },
    signInUserManagement: {
        title: '使用者簽到記錄',
        columns: {
            userId: '使用者ID',
            userName: '使用者名稱',
            totalSignIns: '總簽到次數',
            continuousDays: '連續簽到',
            maxContinuousDays: '最長連續',
            monthlySignIns: '本月簽到',
            pointsEarned: '累計積分',
            todaySigned: '今日狀態',
            lastSignInDate: '最後簽到時間',
            action: '操作'
        },
        search: {
            userIdPlaceholder: '請輸入使用者ID',
            userNamePlaceholder: '請輸入使用者名稱',
            monthPlaceholder: '選擇月份',
            search: '搜尋',
            reset: '重設'
        },
        action: {
            viewDetail: '詳情',
            brief: '簡訊'
        },
        detail: {
            title: '簽到詳情',
            monthlyRecord: '本月簽到記錄'
        },
        brief: {
            title: '簽到簡訊',
            monthlyRecord: '本月簽到記錄'
        },
        export: {
            button: '匯出資料',
            title: '確認匯出',
            content: '確定要匯出目前篩選條件下的簽到資料嗎？',
            success: '匯出成功',
            failed: '匯出失敗'
        },
        messages: {
            loadFailed: '載入資料失敗'
        },
        pagination: {
            total: '共 {total} 條記錄'
        }
    },
    home: {
        modernFrontend: '現代化的前端開發體驗',
        frontendSolution: '基於 Vue 3 + TypeScript + Vite + Ant Design Vue 的前端解決方案',
        illustration: '插圖',
        welcome: '歡迎訪問',
        loginToUse: '登入後即可使用完整功能',
        login: '登入',
        enterAdmin: '進入管理後台',
        logout: '登出',
        guestUser: '訪客使用者',
        normalUser: '普通使用者',
        logoutSuccess: '已登出',
    },
    about: {
        aboutProject: '關於專案',
        projectInfo: '專案資訊',
        projectName: '專案名稱',
        techStack: '技術堆疊',
        buildTool: '建構工具',
        uiLibrary: 'UI 元件庫',
        router: '路由管理',
        techDescription: '技術說明',
        viteDesc: 'Vite - 下一代前端建構工具，提供極速的開發體驗',
        vueDesc: 'Vue 3 - 漸進式 JavaScript 框架，使用 Composition API',
        tsDesc: 'TypeScript - 為 JavaScript 新增類型系統',
        antDesc: 'Ant Design Vue - 企業級 UI 設計語言和元件庫',
        features: '功能特性',
        modernDev: '現代化開發',
        modernDevDesc: '使用 Vue 3 Composition API 和 TypeScript 提供類型安全的開發體驗',
        fastBuild: '極速建構',
        fastBuildDesc: '基於 Vite 的開發伺服器和建構工具，提供毫秒級的熱更新',
        beautifulUi: '精美 UI',
        beautifulUiDesc: '整合 Ant Design Vue 元件庫，提供豐富的 UI 元件和設計規範',
        secure: '安全可靠',
        secureDesc: '內建路由守衛和狀態管理，提供安全的使用者認證和權限控制',
    },
    error: {
        notFound: '頁面不存在',
        errorDescription: '抱歉，您訪問的頁面可能已被刪除、移動或輸入了錯誤的地址。',
        back: '返回',
        goHome: '回到首頁',
    },
    login: {
        pleaseEnterUsername: '請輸入使用者名稱',
        pleaseEnterPassword: '請輸入密碼',
        passwordMinLength: '密碼長度不能少於6位',
        loginSuccess: '登入成功',
        loginFailed: '登入失敗，請稍後重試',
        usernamePasswordError: '使用者名稱或密碼錯誤',
        githubLogin: 'GitHub登入',
        googleLogin: 'Google登入',
        qqLogin: 'QQ登入',
        wechatLogin: '微信登入',
        webcatxLogin: 'WebCatX登入',
    },
    register: {
        pleaseEnterUsername: '請輸入使用者名稱',
        usernameLength: '使用者名稱長度為 2～32 個字元',
        pleaseEnterPassword: '請輸入密碼',
        passwordMinLength: '密碼長度不能少於6位',
        pleaseReEnterPassword: '請再次輸入密碼',
        passwordNotMatch: '兩次輸入的密碼不一致',
        pleaseAgree: '請閱讀並同意相關協議',
        registerSuccess: '註冊成功，請登入',
        registerFailed: '註冊失敗，請稍後重試',
        usernameExists: '註冊失敗: 使用者名稱已存在或使用者名稱已被禁用',
    },
    locale: {
        zhCN: '簡體中文',
        zhTW: '繁體中文',
        enUS: 'English',
        ruRU: 'Русский',
    },
    resource: {
        management: {
            title: '資源管理',
            expandAll: '展開全部',
            collapseAll: '收起全部',
            addResource: '新增資源',
            edit: '編輯',
            delete: '刪除',
            editResource: '編輯資源',
            columns: {
                resourceName: '資源名稱',
                resourceCode: '資源代碼',
                resourceCategory: '資源類型',
                sortOrder: '排序序號',
                status: '狀態',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                extraInfo: '擴展資訊（選填）',
                resourceName: '資源名稱',
                resourceCode: '資源代碼',
                resourceDescription: '資源描述',
                resourceCategory: '資源類型',
                resourcePath: '資源路徑',
                parentId: '父級資源',
                level: '資源層級',
                sortOrder: '排序序號',
                status: '狀態',
                createBy: '建立人使用者ID',
                updateBy: '更新人使用者ID',
                resourceComponent: '元件路徑',
                resourceIcon: '資源圖標',
                visible: '是否可見',
                isSystem: '是否系統內建資源',
                permissionFlag: '權限標識',
                requiresAuth: '是否需要認證',
                keepAlive: '是否快取頁面',
                externalLink: '是否外部連結',
                target: '連結開啟方式',
                badge: '徽章內容',
                badgeType: '徽章類型',
                metaJson: '元數據(JSON)',
                catalog: '目錄',
                menu: '菜單',
                button: '按鈕',
                api: '介面',
                page: '頁面',
                module: '模組',
                other: '其它',
                none: '無',
                validate: {
                    resourceName: '請輸入資源名稱',
                    resourceCategory: '請選擇資源類型',
                    status: '請選擇狀態'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除資源 "{resourceName}" 嗎？'
                }
            }
        },
        common: {
            enabled: '啟用',
            disabled: '禁用',
            visible: '可見',
            hidden: '隱藏',
            yes: '是',
            no: '否'
        }
    },
    role: {
        management: {
            title: '角色管理',
            addRole: '新增角色',
            edit: '編輯',
            delete: '刪除',
            editRole: '編輯角色',
            columns: {
                roleId: '角色ID',
                roleName: '角色名稱',
                roleCode: '角色代碼',
                roleDescription: '角色描述',
                isSystemRole: '系統角色',
                isDefault: '預設角色',
                sortOrder: '排序序號',
                status: '狀態',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                extraInfo: '擴展資訊（選填）',
                roleName: '角色名稱',
                roleCode: '角色代碼',
                roleDescription: '角色描述',
                sortOrder: '排序序號',
                status: '狀態',
                isSystemRole: '系統角色',
                isDefault: '預設角色',
                validate: {
                    roleName: '請輸入角色名稱',
                    status: '請選擇狀態'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除角色 "{roleName}" 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        },
        common: {
            enabled: '啟用',
            disabled: '禁用',
            systemRole: '系統角色',
            normalRole: '普通角色',
            yes: '是',
            no: '否'
        }
    },
    systemConfig: {
        management: {
            title: '系統設定',
            add: '新增',
            edit: '編輯',
            delete: '刪除',
            columns: {
                id: 'ID',
                configKey: '設定鍵',
                configValue: '設定值',
                configType: '類型',
                description: '描述',
                isPublic: '公開',
                createdAt: '建立時間',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                extraInfo: '擴展資訊（選填）',
                configKey: '設定鍵',
                configValue: '設定值',
                configType: '設定類型',
                description: '描述',
                isPublic: '公開設定',
                configKeyPlaceholder: '唯一鍵，如 app.name',
                validate: {
                    configKey: '請輸入設定鍵',
                    configValue: '請輸入設定值',
                    configType: '請選擇類型'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除設定 "{configKey}" 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        },
        common: {
            yes: '是',
            no: '否'
        }
    },
    userFeedback: {
        management: {
            title: '使用者回饋',
            add: '新增',
            edit: '編輯',
            delete: '刪除',
            columns: {
                id: 'ID',
                userId: '使用者ID',
                type: '類型',
                content: '內容',
                status: '狀態',
                createdAt: '建立時間',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                extraInfo: '擴展資訊（選填）',
                userId: '使用者ID',
                type: '回饋類型',
                content: '回饋內容',
                status: '狀態',
                contactInfo: '聯繫方式',
                reply: '回覆內容',
                validate: {
                    userId: '請輸入使用者ID',
                    type: '請選擇回饋類型',
                    content: '請輸入回饋內容',
                    status: '請選擇狀態'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除回饋 #{id} 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        },
        common: {
            type: {
                systemIssue: '系統問題',
                featureSuggestion: '功能建議',
                bugReport: 'BUG回饋',
                other: '其他'
            },
            status: {
                pending: '待處理',
                accepted: '已受理',
                resolved: '已解決',
                closed: '已關閉'
            }
        }
    },
    userManagement: {
        title: '使用者管理',
        addUser: '新增使用者',
        edit: '編輯',
        delete: '刪除',
        editUser: '編輯使用者',
        detail: '詳情',
        columns: {
            userId: '使用者ID',
            username: '使用者名稱',
            accountStatus: '帳戶狀態',
            createdAt: '建立時間',
            action: '操作'
        },
        form: {
            basicInfo: '基本資訊（必填）',
            username: '使用者名稱',
            password: '密碼',
            resetPassword: '重置密碼',
            resetPasswordPlaceholder: '留空則不修改密碼',
            accountStatus: '帳戶狀態',
            randomUsername: '隨機生成使用者名稱',
            randomPassword: '隨機生成密碼',
            validate: {
                username: '請輸入使用者名稱',
                password: '請輸入密碼',
                accountStatus: '請選擇帳戶狀態'
            }
        },
        messages: {
            loadFailed: '載入數據失敗',
            deleteSuccess: '註銷成功',
            deleteFailed: '註銷失敗',
            updateSuccess: '更新成功',
            registerSuccess: '註冊成功'
        },
        confirm: {
            delete: {
                title: '確認註銷',
                content: '確定要註銷使用者 "{username}" 嗎？'
            }
        },
        status: {
            normal: '正常',
            disabled: '禁用'
        },
        pagination: {
            total: '共 {total} 條'
        }
    },
    userAssign: {
        title: '使用者分配管理',
        searchPlaceholder: '搜尋使用者名稱或使用者ID',
        assign: '分配',
        assignRoles: '分配角色',
        assignResources: '分配資源',
        assignVip: '分配VIP',
        assignPoints: '分配積分',
        assignLicense: '分配授權',
        columns: {
            userId: '使用者ID',
            username: '使用者名稱',
            accountStatus: '狀態',
            createdAt: '建立時間',
            action: '操作'
        },
        status: {
            normal: '正常',
            disabled: '禁用'
        },
        extraInfo: {
            userId: '使用者ID',
            username: '使用者名稱',
            roles: '當前角色',
            vipLevel: 'VIP等級',
            points: '當前積分',
            accountStatus: '賬戶狀態'
        },
        form: {
            basicInfo: '基本資訊（必填）',
            extraInfo: '擴展資訊（選填）',
            userId: '使用者ID',
            username: '使用者名稱',
            selectRoles: '選擇角色',
            selectRolesPlaceholder: '請選擇要分配的角色',
            selectResources: '選擇資源',
            selectResourcesPlaceholder: '請選擇要分配的資源',
            vipLevel: 'VIP等級',
            selectVipPlaceholder: '請選擇VIP等級',
            vipExpireTime: '過期時間',
            vipExpireTimePlaceholder: '請選擇過期時間',
            pointsType: '操作類型',
            pointsAdd: '增加積分',
            pointsSubtract: '扣除積分',
            pointsSet: '設定為',
            pointsAmount: '積分數量',
            pointsAmountPlaceholder: '請輸入積分數量',
            pointsReason: '操作原因',
            pointsReasonPlaceholder: '請輸入操作原因',
            licenseType: '授權類型',
            selectLicensePlaceholder: '請選擇授權類型',
            licenseDuration: '有效期',
            licenseDurationPlaceholder: '請輸入有效天數',
            licenseReason: '分配原因',
            licenseReasonPlaceholder: '請輸入分配原因',
            days: '天',
            validate: {
                roleIds: '請選擇角色',
                resourceIds: '請選擇資源',
                vipLevel: '請選擇VIP等級',
                pointsAmount: '請輸入積分數量',
                pointsReason: '請輸入操作原因',
                licenseType: '請選擇授權類型',
                licenseDuration: '請輸入有效天數'
            }
        },
        messages: {
            loadFailed: '載入數據失敗',
            loadDetailFailed: '載入使用者詳情失敗',
            loadRoleFailed: '載入角色列表失敗',
            loadResourceFailed: '載入資源列表失敗',
            loadVipFailed: '載入VIP等級列表失敗',
            loadLicenseFailed: '載入授權列表失敗',
            noChanges: '沒有需要更新的內容',
            assignSuccess: '分配成功',
            assignRolesSuccess: '角色分配成功',
            assignResourcesSuccess: '資源分配成功',
            assignVipSuccess: 'VIP分配成功',
            assignPointsSuccess: '積分分配成功',
            assignLicenseSuccess: '授權分配成功'
        },
        pagination: {
            total: '共 {total} 條'
        }
    },
    userNameHistory: {
        management: {
            title: '使用者名稱變更歷史',
            add: '新增',
            edit: '編輯',
            delete: '刪除',
            columns: {
                historyId: '歷史ID',
                userId: '使用者ID',
                oldDisplayName: '原顯示名稱',
                newDisplayName: '新顯示名稱',
                changedBy: '修改人',
                changedAt: '修改時間',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                userId: '使用者ID',
                oldDisplayName: '原顯示名稱',
                newDisplayName: '新顯示名稱',
                changedBy: '修改人使用者ID',
                createdBy: '新增人使用者ID',
                randomNewDisplayName: '隨機生成新顯示名稱',
                validate: {
                    userId: '請輸入使用者ID',
                    oldDisplayName: '請輸入原顯示名稱',
                    newDisplayName: '請輸入新顯示名稱'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除歷史記錄 #{historyId} 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        }
    },
    userNames: {
        management: {
            title: '使用者名稱資訊管理',
            add: '新增',
            edit: '編輯',
            delete: '刪除',
            columns: {
                nameId: '名稱ID',
                userId: '使用者ID',
                createName: '建立使用者名稱',
                displayName: '顯示名稱',
                isDefaultDisplay: '預設顯示',
                createdAt: '建立時間',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                userId: '使用者ID',
                createName: '建立使用者名稱',
                displayName: '顯示名稱',
                isDefaultDisplay: '預設顯示',
                randomCreateName: '隨機生成建立使用者名稱',
                randomDisplayName: '隨機生成顯示名稱',
                validate: {
                    userId: '請輸入使用者ID',
                    createName: '請輸入建立使用者名稱',
                    displayName: '請輸入顯示名稱',
                    isDefaultDisplay: '請選擇'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除使用者名稱 "{displayName}" 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        },
        common: {
            yes: '是',
            no: '否'
        }
    },
    vipLevel: {
        management: {
            title: 'VIP等級設定',
            add: '新增',
            edit: '編輯',
            delete: '刪除',
            columns: {
                levelId: '等級ID',
                vipLevel: 'VIP等級',
                levelName: '等級名稱',
                minPoints: '最小成長值',
                maxPoints: '最大成長值',
                dailyPointsLimit: '每日上限',
                monthlyPointsLimit: '每月上限',
                status: '狀態',
                createdAt: '建立時間',
                action: '操作'
            },
            form: {
                basicInfo: '基本資訊（必填）',
                extraInfo: '擴展資訊（選填）',
                vipLevel: 'VIP等級',
                levelName: '等級名稱',
                minPoints: '最小成長值',
                maxPoints: '最大成長值',
                dailyPointsLimit: '每日上限',
                monthlyPointsLimit: '每月上限',
                status: '狀態',
                iconUrl: '圖標URL',
                badgeColor: '徽章顏色',
                benefitsJson: '權益設定(JSON)',
                maxPointsPlaceholder: '空表示無上限',
                iconUrlPlaceholder: '圖標連結地址',
                badgeColorPlaceholder: '#hex 或 顏色名',
                benefitsJsonPlaceholder: 'JSON格式，如: {"discount": 0.9, "freeShipping": true}',
                validate: {
                    vipLevel: '請輸入VIP等級',
                    levelName: '請輸入等級名稱',
                    minPoints: '請輸入最小成長值',
                    dailyPointsLimit: '請輸入每日上限',
                    monthlyPointsLimit: '請輸入每月上限',
                    status: '請選擇狀態'
                }
            },
            messages: {
                loadFailed: '載入數據失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                updateSuccess: '更新成功',
                createSuccess: '新增成功'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除等級 "{levelName}" 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條'
            }
        },
        common: {
            enabled: '啟用',
            disabled: '禁用'
        }
    },
    userDetail: {
        title: '使用者詳情管理',
        noData: '請搜尋使用者以查看詳情',
        basicInfo: '基本資訊',
        profileInfo: '個人資料',
        nameInfo: '使用者名稱資訊',
        pointsInfo: '積分資訊',
        vipInfo: 'VIP資訊',
        rolesInfo: '角色資訊',
        nameHistory: '使用者名稱變更歷史',
        feedbackInfo: '使用者回饋記錄',
        licenseInfo: '使用者授權',
        userId: '使用者ID',
        username: '使用者名稱',
        createdAt: '建立時間',
        nickname: '暱稱',
        email: '電子郵件',
        phone: '手機號',
        gender: '性別',
        genderMale: '男',
        genderFemale: '女',
        genderOther: '其他',
        birthDate: '生日',
        bio: '個人簡介',
        createName: '建立使用者名稱',
        displayName: '顯示名稱',
        isDefaultDisplay: '預設顯示',
        totalPoints: '總積分',
        availablePoints: '可用積分',
        frozenPoints: '凍結積分',
        consumedPoints: '已消費積分',
        vipLevel: 'VIP等級',
        vipPoints: 'VIP積分',
        totalEarnedPoints: '累計獲得積分',
        vipStatus: 'VIP狀態',
        roleId: '角色ID',
        roleName: '角色名稱',
        roleCode: '角色代碼',
        isSystemRole: '系統角色',
        status: '狀態',
        historyId: '歷史ID',
        oldDisplayName: '原顯示名稱',
        newDisplayName: '新顯示名稱',
        changedAt: '修改時間',
        feedbackId: 'ID',
        feedbackType: '類型',
        feedbackContent: '內容',
        feedbackStatus: '狀態',
        feedbackCreatedAt: '建立時間',
        licenseKey: '授權金鑰',
        licenseType: '類型',
        licenseStatus: '狀態',
        licenseStartTime: '開始時間',
        licenseEndTime: '結束時間',
        search: {
            userId: '使用者ID',
            username: '使用者名稱',
            userIdPlaceholder: '請輸入使用者ID',
            usernamePlaceholder: '請輸入使用者名稱',
            selectOne: '請輸入使用者ID或使用者名稱進行搜尋'
        },
        messages: {
            loadFailed: '獲取使用者詳情失敗',
            userNotFound: '使用者不存在'
        }
    },
    profiles: {
        title: '使用者資料管理',
        addProfile: '新增資料',
        editProfile: '編輯資料',
        columns: {
            profileId: '資料ID',
            userId: '使用者ID',
            nickname: '暱稱',
            email: '電子郵件',
            phone: '手機號',
            gender: '性別',
            createdAt: '建立時間',
            action: '操作'
        },
        search: {
            userId: '使用者ID',
            nickname: '暱稱',
            email: '電子郵件',
            userIdPlaceholder: '請輸入使用者ID',
            nicknamePlaceholder: '請輸入暱稱',
            emailPlaceholder: '請輸入電子郵件'
        },
        form: {
            basicInfo: '基本資訊（必填）',
            extraInfo: '延伸資訊（選填）',
            userId: '使用者ID',
            nickname: '暱稱',
            email: '電子郵件',
            phone: '手機號',
            avatarUrl: '頭像URL',
            birthDate: '生日',
            gender: '性別',
            bio: '個人簡介',
            userIdPlaceholder: '請輸入使用者ID',
            nicknamePlaceholder: '請輸入暱稱',
            emailPlaceholder: '請輸入電子郵件',
            phonePlaceholder: '請輸入手機號',
            avatarUrlPlaceholder: '請輸入頭像URL',
            genderPlaceholder: '請選擇性別',
            bioPlaceholder: '請輸入個人簡介',
            validate: {
                userId: '請輸入使用者ID'
            }
        },
        messages: {
            loadFailed: '載入數據失敗',
            createSuccess: '新增成功',
            updateSuccess: '更新成功',
            deleteSuccess: '刪除成功',
            deleteFailed: '刪除失敗',
            saveFailed: '儲存失敗'
        },
        confirm: {
            delete: {
                title: '確認刪除',
                content: '確定要刪除資料 "{nickname}" 嗎？'
            }
        },
        pagination: {
            total: '共 {total} 條'
        },
        genderMale: '男',
        genderFemale: '女',
        genderOther: '其他'
    },
    licenses: {
        title: '授權管理',
        assignLicense: '分配授權',
        detailTitle: '授權詳情',
        activationCode: '啟動碼',
        columns: {
            licenseKey: '授權金鑰',
            licenseId: '授權ID',
            userName: '使用者名稱',
            companyName: '公司名稱',
            contactEmail: '聯絡電子郵件',
            licenseType: '類型',
            status: '狀態',
            startTime: '開始時間',
            endTime: '結束時間',
            productVersion: '產品版本',
            maxConcurrentUsers: '最大並發使用者',
            allowOffline: '允許離線',
            features: '功能',
            remarks: '備註',
            hardwareInfo: '硬體資訊',
            activationCode: '啟動碼',
            lastActivationTime: '最後啟動時間',
            createdBy: '建立者',
            action: '操作'
        },
        search: {
            licenseKey: '授權金鑰',
            licenseKeyPlaceholder: '請輸入授權金鑰'
        },
        form: {
            licenseKey: '授權金鑰',
            userId: '使用者ID',
            licenseKeyPlaceholder: '請輸入授權金鑰',
            userIdPlaceholder: '請輸入使用者ID',
            validate: {
                required: '請填寫授權金鑰和使用者ID'
            }
        },
        type: {
            trial: '試用版',
            basic: '基礎版',
            premium: '進階版',
            standard: '標準版',
            professional: '專業版',
            enterprise: '企業版',
            custom: '客製版'
        },
        status: {
            active: '有效',
            expired: '已過期',
            revoked: '已撤銷',
            inactive: '未啟用',
            suspended: '已暫停'
        },
        messages: {
            loadFailed: '載入數據失敗',
            enterLicenseKey: '請輸入授權金鑰進行搜尋',
            notFound: '未找到授權',
            disableSuccess: '停用成功',
            disableFailed: '停用失敗',
            enableSuccess: '啟用成功',
            enableFailed: '啟用失敗',
            generateCodeFailed: '產生啟動碼失敗',
            assignSuccess: '分配成功',
            assignFailed: '分配失敗'
        },
        confirm: {
            disable: {
                title: '確認停用',
                content: '確定要停用授權 "{licenseKey}" 嗎？'
            }
        },
        pagination: {
            total: '共 {total} 條'
        },
        personal: {
            title: '個人授權',
            description: '查看目前使用者或指定授權的詳細資訊',
            noData: '暫無授權資料',
            backToList: '返回列表',
            applyTrial: '申請試用',
            applyTrialSuccess: '試用授權申請成功',
            applyTrialFailed: '試用授權申請失敗，請稍後重試'
        },
        userManagement: {
            title: '使用者授權',
            columns: {
                licenseKey: '授權金鑰',
                userName: '使用者名稱',
                companyName: '公司名稱',
                contactEmail: '聯絡電子郵件',
                licenseType: '授權類型',
                status: '狀態',
                startTime: '開始時間',
                endTime: '結束時間',
                productVersion: '產品版本',
                maxConcurrentUsers: '最大並發使用者數',
                features: '功能',
                remarks: '備註',
                action: '操作'
            },
            search: {
                licenseKey: '授權金鑰',
                licenseKeyPlaceholder: '請輸入授權金鑰',
                search: '搜尋',
                reset: '重設'
            },
            action: {
                detail: '詳情',
                edit: '編輯',
                delete: '刪除'
            },
            form: {
                addTitle: '新增授權關聯',
                editTitle: '編輯授權資訊',
                licenseKey: '授權金鑰',
                userId: '使用者ID',
                licenseKeyPlaceholder: '請輸入授權金鑰',
                userIdPlaceholder: '請輸入使用者ID'
            },
            messages: {
                loadFailed: '載入授權資料失敗',
                deleteSuccess: '刪除成功',
                deleteFailed: '刪除失敗',
                saveSuccess: '儲存成功',
                saveFailed: '儲存失敗'
            },
            confirm: {
                delete: {
                    title: '確認刪除',
                    content: '確定要刪除授權 "{licenseKey}" 嗎？'
                }
            },
            pagination: {
                total: '共 {total} 條記錄'
            }
        }
    },
    licensesManagement: {
        title: '授權管理',
        columns: {
            assignedUsers: '分配使用者'
        },
        search: {
            licenseTypePlaceholder: '授權類型',
            statusPlaceholder: '狀態'
        },
        action: {
            viewUsers: '查看使用者',
            disable: '停用',
            enable: '啟用'
        },
        form: {
            editTitle: '編輯授權',
            basicInfo: '基本資訊',
            extendedInfo: '延伸資訊',
            assignedUsers: '已分配使用者',
            userNamePlaceholder: '請輸入使用者名稱',
            companyNamePlaceholder: '請輸入公司名稱',
            productVersionPlaceholder: '請輸入產品版本',
            contactEmailPlaceholder: '請輸入聯絡電子郵件',
            hardwareInfoPlaceholder: '請輸入硬體綁定資訊',
            activationCodePlaceholder: '請輸入啟動碼',
            selectLicenseType: '請選擇授權類型',
            selectStatus: '請選擇狀態',
            selectStartTime: '請選擇開始時間',
            selectEndTime: '請選擇結束時間',
            selectAllowOffline: '請選擇是否允許離線',
            offlineDisabled: '不允許',
            offlineEnabled: '允許',
            maxConcurrentUsersPlaceholder: '請輸入最大並發使用者數',
            featuresPlaceholder: '請輸入功能配置',
            remarksPlaceholder: '請輸入備註',
            validate: {
                userName: '請輸入使用者名稱',
                companyName: '請輸入公司名稱',
                productVersion: '請輸入產品版本',
                licenseType: '請選擇授權類型',
                status: '請選擇狀態'
            }
        },
        confirm: {
            disable: {
                title: '確認停用',
                content: '確定要停用授權 "{licenseKey}" 嗎？'
            },
            enable: {
                title: '確認啟用',
                content: '確定要啟用授權 "{licenseKey}" 嗎？'
            },
            delete: {
                title: '確認刪除',
                content: '確定要刪除授權 "{licenseKey}" 及其所有關聯嗎？'
            }
        },
        messages: {
            deleteSuccess: '刪除成功',
            deleteFailed: '刪除失敗'
        },
        modal: {
            assignedUsersTitle: '已分配使用者',
            noAssignedUsers: '暫無已分配使用者',
            userId: '使用者ID',
            status: '狀態',
            assignedAt: '分配時間'
        }
    },
    licensesUserManagement: {
        title: '使用者授權',
        columns: {
            userId: '使用者ID',
            username: '使用者名稱',
            accountStatus: '帳戶狀態',
            licenseCount: '授權數量',
            createdAt: '建立時間'
        },
        search: {
            keywordPlaceholder: '搜尋使用者名稱或使用者ID'
        },
        action: {
            assignLicense: '分配授權',
            addLicense: '新增授權',
            remove: '移除'
        },
        confirm: {
            remove: {
                title: '確認移除',
                content: '確定要移除使用者 "{username}" 的授權 "{licenseKey}" 嗎？'
            }
        },
        messages: {
            loadFailed: '載入數據失敗',
            removeSuccess: '移除成功',
            removeFailed: '移除失敗'
        },
        noLicenses: '該使用者暫無授權'
    }
} as const
