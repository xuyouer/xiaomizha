/**
 * Русский языковой пакет
 */
export default {
    common: {
        confirm: 'Подтвердить',
        cancel: 'Отмена',
        save: 'Сохранить',
        delete: 'Удалить',
        edit: 'Редактировать',
        add: 'Добавить',
        search: 'Поиск',
        reset: 'Сбросить',
        submit: 'Отправить',
        back: 'Назад',
        loading: 'Загрузка...',
        success: 'Операция выполнена успешно',
        fail: 'Операция не выполнена',
    },
    nav: {
        home: 'Главная',
        about: 'О нас',
        login: 'Вход',
        register: 'Регистрация',
        logout: 'Выход',
        toRegister: 'Перейти к регистрации',
        toLogin: 'Перейти к входу',
    },
    menu: {
        title: 'Меню',
    },
    app: {
        name: 'ксиаомижа',
        title: 'Система управления ксиаомижа',
        welcome: 'Добро пожаловать',
        slogan: 'Фронтенд-решение ксиаомижа',
        subtitle: 'Эффективная, безопасная и интеллектуальная платформа управления',
        copyright: 'ксиаомижа. Все права защищены.',
        userAgreement: 'Пользовательское соглашение',
        privacyPolicy: 'Политика конфиденциальности',
        serviceAgreement: 'Соглашение об услугах',
        contactUs: 'Связаться с нами',
    },
    auth: {
        pleaseLogin: 'Пожалуйста, войдите',
        loginFailed: 'Не удалось получить информацию о пользователе, пожалуйста, войдите снова',
        logoutSuccess: 'Вы вышли из системы',
        welcomeBack: 'С возвращением',
        pleaseLoginAccount: 'Пожалуйста, войдите в свою учетную запись',
        createdAccount: 'Создать учетную запись',
        pleaseFillRegInfo: 'Пожалуйста, заполните регистрационную информацию',
        username: 'Имя пользователя',
        password: 'Пароль',
        pleaseEnterUsername: 'Пожалуйста, введите имя пользователя',
        pleaseEnterPassword: 'Пожалуйста, введите пароль',
        pleaseReEnterPassword: 'Пожалуйста, введите пароль еще раз',
        login: 'Вход',
        register: 'Регистрация',
        goRegister: 'Перейти к регистрации',
        goLogin: 'Перейти к входу',
        autoLogin: 'Автоматический вход',
        forgotPassword: 'Забыли пароль',
        otherLoginWays: 'Другие способы входа',
        readAgreed: 'Я прочитал и согласен',
    },
    userDropdown: {
        security: 'Безопасность',
        helpCenter: 'Центр помощи',
        about: 'О системе',
        comingSoon: 'Скоро будет доступно',
    },
    admin: {
        dashboard: 'Панель управления',
        system: 'Управление системой',
        userManage: 'Управление пользователями',
        profilesManage: 'Управление профилями',
        userDetailManage: 'Детали пользователя',
        roleManage: 'Управление ролями',
        resourceManage: 'Управление ресурсами',
        userNames: 'Информация о пользователях',
        userNameHistory: 'История имен пользователей',
        vipLevelConfig: 'Настройка уровня VIP',
        systemConfigs: 'Системные настройки',
        userFeedback: 'Обратная связь пользователей',
        licensesManage: 'Управление лицензиями',
        profile: 'Персональное управление',
        personalCenter: 'Личный центр',
        personalSettings: 'Персональные настройки',
        personalSecurity: 'Безопасность аккаунта',
        user: 'Пользователь',
        signInManage: 'Управление регистрацией',
        signInCenter: 'Центр регистрации',
    },
    personalSecurity: {
        title: 'Безопасность аккаунта',
        password: {
            title: 'Пароль для входа',
            description: 'Регулярная смена пароля повышает безопасность аккаунта',
            changePassword: 'Изменить пароль',
            currentPassword: 'Текущий пароль',
            newPassword: 'Новый пароль',
            confirmPassword: 'Подтвердите новый пароль',
            currentPasswordPlaceholder: 'Введите текущий пароль',
            newPasswordPlaceholder: 'Введите новый пароль',
            confirmPasswordPlaceholder: 'Повторите новый пароль',
            passwordMinLength: 'Пароль должен содержать минимум 6 символов',
            passwordNotMatch: 'Пароли не совпадают',
            changeSuccess: 'Пароль успешно изменен',
            changeFailed: 'Не удалось изменить пароль',
            currentPasswordError: 'Текущий пароль неверен',
            lastChanged: 'Последнее изменение',
            neverChanged: 'Никогда не изменялся'
        },
        twoFactor: {
            title: 'Двухфакторная аутентификация',
            description: 'Включите двухфакторную аутентификацию для дополнительной защиты',
            enable: 'Включить',
            disable: 'Отключить',
            enabled: 'Включено',
            disabled: 'Отключено',
            scanQrCode: 'Отсканируйте QR-код приложением аутентификатора',
            enterCode: 'Введите 6-значный код',
            codePlaceholder: 'Введите 6-значный код',
            verifySuccess: 'Верификация успешна',
            verifyFailed: 'Верификация не удалась',
            enableSuccess: 'Двухфакторная аутентификация включена',
            disableSuccess: 'Двухфакторная аутентификация отключена',
            disableConfirm: 'Отключение двухфакторной аутентификации снижает безопасность аккаунта. Вы уверены?'
        },
        loginHistory: {
            title: 'История входов',
            description: 'Просмотр недавних записей входа',
            viewAll: 'Показать все',
            device: 'Устройство',
            location: 'Местоположение',
            ip: 'IP-адрес',
            time: 'Время входа',
            status: 'Статус',
            current: 'Текущее устройство',
            success: 'Успешно',
            failed: 'Не удалось',
            noRecords: 'Нет записей входа'
        },
        securityQuestions: {
            title: 'Контрольные вопросы',
            description: 'Установите контрольные вопросы для восстановления пароля',
            set: 'Установить',
            edit: 'Изменить',
            question1: 'Вопрос 1',
            question2: 'Вопрос 2',
            question3: 'Вопрос 3',
            answer: 'Ответ',
            answerPlaceholder: 'Введите ответ',
            setSuccess: 'Контрольные вопросы установлены',
            updateSuccess: 'Контрольные вопросы обновлены',
            questions: {
                petName: 'Как звали вашего первого питомца?',
                motherMaidenName: 'Какая девичья фамилия вашей матери?',
                birthCity: 'В каком городе вы родились?',
                favoriteFood: 'Какая ваша любимая еда?',
                firstSchool: 'Как называлась ваша первая школа?',
                favoriteMovie: 'Какой ваш любимый фильм?',
                childhoodFriend: 'Как зовут вашего лучшего друга детства?',
                favoriteBook: 'Какая ваша любимая книга?'
            }
        },
        sessions: {
            title: 'Устройства входа',
            description: 'Управление устройствами с входом',
            currentDevice: 'Текущее устройство',
            lastActive: 'Последняя активность',
            logout: 'Выйти',
            logoutAll: 'Выйти со всех других устройств',
            logoutConfirm: 'Вы уверены, что хотите выйти с этого устройства?',
            logoutAllConfirm: 'Вы уверены, что хотите выйти со всех других устройств?',
            logoutSuccess: 'Выход выполнен успешно',
            logoutAllSuccess: 'Выход со всех других устройств выполнен успешно',
            noOtherDevices: 'Нет других устройств с входом'
        },
        accountStatus: {
            title: 'Статус аккаунта',
            normal: 'Нормальный',
            risk: 'В зоне риска',
            locked: 'Заблокирован',
            securityScore: 'Оценка безопасности',
            suggestions: 'Рекомендации по безопасности',
            enableTwoFactor: 'Включить двухфакторную аутентификацию',
            changePassword: 'Изменить пароль',
            setSecurityQuestions: 'Установить контрольные вопросы'
        }
    },
    theme: {
        light: 'Светлая',
        dark: 'Темная',
        primaryColor: 'Цвет темы',
    },
    dashboard: {
        totalUsers: 'Всего пользователей',
        totalRoles: 'Всего ролей',
        totalResources: 'Всего ресурсов',
        onlineUsers: 'Онлайн пользователей',
        systemInfo: 'Информация о системе',
        systemName: 'Название системы',
        version: 'Версия',
        currentUser: 'Текущий пользователь',
        loginTime: 'Время входа',
        quickActions: 'Быстрые действия',
        userManagement: 'Управление пользователями',
        roleManagement: 'Управление ролями',
        resourceManagement: 'Управление ресурсами',
        signInCenter: 'Центр регистрации',
        loadStatsFailed: 'Не удалось загрузить статистику',
        viewAll: 'Смотреть все',
    },
    signIn: {
        signInStatus: 'Статус регистрации',
        todaySigned: 'Сегодня зарегистрирован',
        signed: 'Зарегистрирован',
        notSigned: 'Не зарегистрирован',
        signInNow: 'Зарегистрироваться сейчас',
        signingIn: 'Регистрация...',
        viewOnly: 'Только просмотр',
        continuousDays: 'Продолжительные дни',
        day: 'день',
        totalSignIns: 'Общее количество регистраций',
        times: 'раз',
        maxContinuous: 'Максимальный непрерывный',
        lastSignIn: 'Последняя регистрация',
        tomorrowReward: 'Вознаграждение завтра',
        points: 'Очки',
        monthlyRecord: 'Ежемесячная запись',
        monthlySignIns: 'Ежемесячная регистрация',
        monthlyContinuous: 'Ежемесячная непрерывность',
        monthlyPoints: 'Ежемесячные очки',
        pointsUnit: 'очков',
        ranking: 'Рейтинг регистрации',
        totalSignInsRanking: 'Общее количество регистраций',
        continuousDaysRanking: 'Продолжительные дни',
        monthlySignInsRanking: 'Ежемесячная регистрация',
        rank: 'Ранг',
        userId: 'ID пользователя',
        getStatusFailed: 'Не удалось получить статус регистрации',
        signInFailed: 'Регистрация не удалась, попробуйте позже',
        getMonthlyRecordFailed: 'Не удалось получить месячную запись',
        getRankingFailed: 'Не удалось получить рейтинг',
    },
    signInUserManagement: {
        title: 'Записи регистрации пользователей',
        columns: {
            userId: 'ID пользователя',
            userName: 'Имя пользователя',
            totalSignIns: 'Всего регистраций',
            continuousDays: 'Продолжительные дни',
            maxContinuousDays: 'Максимальный непрерывный',
            monthlySignIns: 'Ежемесячная регистрация',
            pointsEarned: 'Заработанные очки',
            todaySigned: 'Статус сегодня',
            lastSignInDate: 'Дата последней регистрации',
            action: 'Действие'
        },
        search: {
            userIdPlaceholder: 'Введите ID пользователя',
            userNamePlaceholder: 'Введите имя пользователя',
            monthPlaceholder: 'Выберите месяц',
            search: 'Поиск',
            reset: 'Сброс'
        },
        action: {
            viewDetail: 'Подробности',
            brief: 'Кратко'
        },
        detail: {
            title: 'Детали регистрации',
            monthlyRecord: 'Ежемесячная запись регистрации'
        },
        brief: {
            title: 'Краткая информация',
            monthlyRecord: 'Ежемесячная запись регистрации'
        },
        export: {
            button: 'Экспорт данных',
            title: 'Подтвердить экспорт',
            content: 'Вы уверены, что хотите экспортировать данные регистрации с текущими фильтрами?',
            success: 'Экспорт успешен',
            failed: 'Ошибка экспорта'
        },
        messages: {
            loadFailed: 'Не удалось загрузить данные'
        },
        pagination: {
            total: 'Всего {total} записей'
        }
    },
    home: {
        modernFrontend: 'Современный опыт фронтенд-разработки',
        frontendSolution: 'Фронтенд-решение на основе Vue 3 + TypeScript + Vite + Ant Design Vue',
        illustration: 'Иллюстрация',
        welcome: 'Добро пожаловать',
        loginToUse: 'Войдите, чтобы использовать полные функции',
        login: 'Вход',
        enterAdmin: 'Войти в админку',
        logout: 'Выход',
        guestUser: 'Гостевой пользователь',
        normalUser: 'Обычный пользователь',
        logoutSuccess: 'Вы вышли из системы',
    },
    about: {
        aboutProject: 'О проекте',
        projectInfo: 'Информация о проекте',
        projectName: 'Название проекта',
        techStack: 'Технологический стек',
        buildTool: 'Сборочный инструмент',
        uiLibrary: 'UI-библиотека',
        router: 'Маршрутизатор',
        techDescription: 'Техническое описание',
        viteDesc: 'Vite - Новое поколение инструментов сборки фронтенда, обеспечивающее быстрый опыт разработки',
        vueDesc: 'Vue 3 - Прогрессивный JavaScript-фреймворк, использующий Composition API',
        tsDesc: 'TypeScript - Добавляет систему типов в JavaScript',
        antDesc: 'Ant Design Vue - Корпоративный язык UI-дизайна и библиотека компонентов',
        features: 'Функции',
        modernDev: 'Современная разработка',
        modernDevDesc: 'Использование Vue 3 Composition API и TypeScript для безопасного типобезопасного опыта разработки',
        fastBuild: 'Быстрая сборка',
        fastBuildDesc: 'На основе сервера разработки и инструмента сборки Vite, обеспечивающих мгновенные горячие обновления',
        beautifulUi: 'Красивый интерфейс',
        beautifulUiDesc: 'Интегрирована с библиотекой компонентов Ant Design Vue, предоставляющей богатые UI-компоненты и дизайн-спецификации',
        secure: 'Безопасно и надежно',
        secureDesc: 'Встроенные маршрутизаторы и управление состоянием, обеспечивающие безопасную аутентификацию пользователей и контроль прав',
    },
    error: {
        notFound: 'Страница не найдена',
        errorDescription: 'Извините, страница, которую вы ищете, может была удалена, перенесена или введен неверный адрес.',
        back: 'Назад',
        goHome: 'Вернуться на главную',
    },
    login: {
        pleaseEnterUsername: 'Пожалуйста, введите имя пользователя',
        pleaseEnterPassword: 'Пожалуйста, введите пароль',
        passwordMinLength: 'Длина пароля должна быть не менее 6 символов',
        loginSuccess: 'Вход выполнен успешно',
        loginFailed: 'Ошибка входа, пожалуйста, попробуйте позже',
        usernamePasswordError: 'Неверное имя пользователя или пароль',
        githubLogin: 'Вход через GitHub',
        googleLogin: 'Вход через Google',
        qqLogin: 'Вход через QQ',
        wechatLogin: 'Вход через WeChat',
        webcatxLogin: 'Вход через WebCatX',
    },
    register: {
        pleaseEnterUsername: 'Пожалуйста, введите имя пользователя',
        usernameLength: 'Длина имени пользователя должна быть от 2 до 32 символов',
        pleaseEnterPassword: 'Пожалуйста, введите пароль',
        passwordMinLength: 'Длина пароля должна быть не менее 6 символов',
        pleaseReEnterPassword: 'Пожалуйста, введите пароль снова',
        passwordNotMatch: 'Пароли не совпадают',
        pleaseAgree: 'Пожалуйста, прочитайте и согласитесь с соответствующими соглашениями',
        registerSuccess: 'Регистрация прошла успешно, пожалуйста, войдите',
        registerFailed: 'Ошибка регистрации, пожалуйста, попробуйте позже',
        usernameExists: 'Ошибка регистрации: имя пользователя уже существует или было заблокировано',
    },
    locale: {
        zhCN: 'Китайский (упрощенный)',
        zhTW: 'Китайский (традиционный)',
        enUS: 'Английский',
        ruRU: 'Русский',
    },
    resource: {
        management: {
            title: 'Управление ресурсами',
            expandAll: 'Развернуть все',
            collapseAll: 'Свернуть все',
            addResource: 'Добавить ресурс',
            edit: 'Редактировать',
            delete: 'Удалить',
            editResource: 'Редактировать ресурс',
            columns: {
                resourceName: 'Название ресурса',
                resourceCode: 'Код ресурса',
                resourceCategory: 'Тип ресурса',
                sortOrder: 'Порядок сортировки',
                status: 'Статус',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                extraInfo: 'Дополнительная информация (опционально)',
                resourceName: 'Название ресурса',
                resourceCode: 'Код ресурса',
                resourceDescription: 'Описание ресурса',
                resourceCategory: 'Тип ресурса',
                resourcePath: 'Путь ресурса',
                parentId: 'Родительский ресурс',
                level: 'Уровень ресурса',
                sortOrder: 'Порядок сортировки',
                status: 'Статус',
                createBy: 'ID пользователя создавшего',
                updateBy: 'ID пользователя обновившего',
                resourceComponent: 'Путь компонента',
                resourceIcon: 'Иконка ресурса',
                visible: 'Видимый',
                isSystem: 'Системный встроенный ресурс',
                permissionFlag: 'Флаг разрешения',
                requiresAuth: 'Требует аутентификации',
                keepAlive: 'Сохранять страницу',
                externalLink: 'Внешняя ссылка',
                target: 'Способ открытия ссылки',
                badge: 'Содержимое бейджа',
                badgeType: 'Тип бейджа',
                metaJson: 'Метаданные (JSON)',
                catalog: 'Каталог',
                menu: 'Меню',
                button: 'Кнопка',
                api: 'API',
                page: 'Страница',
                module: 'Модуль',
                other: 'Другое',
                none: 'Нет',
                validate: {
                    resourceName: 'Пожалуйста, введите название ресурса',
                    resourceCategory: 'Пожалуйста, выберите тип ресурса',
                    status: 'Пожалуйста, выберите статус'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить ресурс "{resourceName}"?'
                }
            }
        },
        common: {
            enabled: 'Включен',
            disabled: 'Отключен',
            visible: 'Видимый',
            hidden: 'Скрытый',
            yes: 'Да',
            no: 'Нет'
        }
    },
    role: {
        management: {
            title: 'Управление ролями',
            addRole: 'Добавить роль',
            edit: 'Редактировать',
            delete: 'Удалить',
            editRole: 'Редактировать роль',
            columns: {
                roleId: 'ID роли',
                roleName: 'Название роли',
                roleCode: 'Код роли',
                roleDescription: 'Описание роли',
                isSystemRole: 'Системная роль',
                isDefault: 'Роль по умолчанию',
                sortOrder: 'Порядок сортировки',
                status: 'Статус',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                extraInfo: 'Дополнительная информация (опционально)',
                roleName: 'Название роли',
                roleCode: 'Код роли',
                roleDescription: 'Описание роли',
                sortOrder: 'Порядок сортировки',
                status: 'Статус',
                isSystemRole: 'Системная роль',
                isDefault: 'Роль по умолчанию',
                validate: {
                    roleName: 'Пожалуйста, введите название роли',
                    status: 'Пожалуйста, выберите статус'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить роль "{roleName}"?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        },
        common: {
            enabled: 'Включен',
            disabled: 'Отключен',
            systemRole: 'Системная роль',
            normalRole: 'Обычная роль',
            yes: 'Да',
            no: 'Нет'
        }
    },
    systemConfig: {
        management: {
            title: 'Системные настройки',
            add: 'Добавить',
            edit: 'Редактировать',
            delete: 'Удалить',
            columns: {
                id: 'ID',
                configKey: 'Ключ настройки',
                configValue: 'Значение настройки',
                configType: 'Тип',
                description: 'Описание',
                isPublic: 'Публично',
                createdAt: 'Дата создания',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                extraInfo: 'Дополнительная информация (опционально)',
                configKey: 'Ключ настройки',
                configValue: 'Значение настройки',
                configType: 'Тип настройки',
                description: 'Описание',
                isPublic: 'Публичная настройка',
                configKeyPlaceholder: 'Уникальный ключ, например app.name',
                validate: {
                    configKey: 'Пожалуйста, введите ключ настройки',
                    configValue: 'Пожалуйста, введите значение настройки',
                    configType: 'Пожалуйста, выберите тип'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить настройку "{configKey}"?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        },
        common: {
            yes: 'Да',
            no: 'Нет'
        }
    },
    userFeedback: {
        management: {
            title: 'Обратная связь пользователей',
            add: 'Добавить',
            edit: 'Редактировать',
            delete: 'Удалить',
            columns: {
                id: 'ID',
                userId: 'ID пользователя',
                type: 'Тип',
                content: 'Содержимое',
                status: 'Статус',
                createdAt: 'Дата создания',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                extraInfo: 'Дополнительная информация (опционально)',
                userId: 'ID пользователя',
                type: 'Тип обратной связи',
                content: 'Содержимое обратной связи',
                status: 'Статус',
                contactInfo: 'Контактная информация',
                reply: 'Содержимое ответа',
                validate: {
                    userId: 'Пожалуйста, введите ID пользователя',
                    type: 'Пожалуйста, выберите тип обратной связи',
                    content: 'Пожалуйста, введите содержимое обратной связи',
                    status: 'Пожалуйста, выберите статус'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить обратную связь #{id}?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        },
        common: {
            type: {
                systemIssue: 'Системная проблема',
                featureSuggestion: 'Предложение функции',
                bugReport: 'Отчет об ошибке',
                other: 'Другое'
            },
            status: {
                pending: 'В ожидании',
                accepted: 'Принято',
                resolved: 'Решено',
                closed: 'Закрыто'
            }
        }
    },
    userManagement: {
        title: 'Управление пользователями',
        addUser: 'Добавить пользователя',
        edit: 'Редактировать',
        delete: 'Удалить',
        editUser: 'Редактировать пользователя',
        detail: 'Детали',
        columns: {
            userId: 'ID пользователя',
            username: 'Имя пользователя',
            accountStatus: 'Статус аккаунта',
            createdAt: 'Дата создания',
            action: 'Действие'
        },
        form: {
            basicInfo: 'Основная информация (обязательно)',
            username: 'Имя пользователя',
            password: 'Пароль',
            resetPassword: 'Сбросить пароль',
            resetPasswordPlaceholder: 'Оставьте пустым, чтобы не менять пароль',
            accountStatus: 'Статус аккаунта',
            randomUsername: 'Сгенерировать случайное имя пользователя',
            randomPassword: 'Сгенерировать случайный пароль',
            validate: {
                username: 'Пожалуйста, введите имя пользователя',
                password: 'Пожалуйста, введите пароль',
                accountStatus: 'Пожалуйста, выберите статус аккаунта'
            }
        },
        messages: {
            loadFailed: 'Не удалось загрузить данные',
            deleteSuccess: 'Удаление успешно',
            deleteFailed: 'Удаление не удалось',
            updateSuccess: 'Обновление успешно',
            registerSuccess: 'Регистрация успешно'
        },
        confirm: {
            delete: {
                title: 'Подтвердить удаление',
                content: 'Вы уверены, что хотите удалить пользователя "{username}"?'
            }
        },
        status: {
            normal: 'Нормальный',
            disabled: 'Отключен'
        },
        pagination: {
            total: 'Всего {total} записей'
        }
    },
    userNameHistory: {
        management: {
            title: 'История изменений имен пользователей',
            add: 'Добавить',
            edit: 'Редактировать',
            delete: 'Удалить',
            columns: {
                historyId: 'ID истории',
                userId: 'ID пользователя',
                oldDisplayName: 'Старое отображаемое имя',
                newDisplayName: 'Новое отображаемое имя',
                changedBy: 'Изменено кем',
                changedAt: 'Время изменения',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                userId: 'ID пользователя',
                oldDisplayName: 'Старое отображаемое имя',
                newDisplayName: 'Новое отображаемое имя',
                changedBy: 'ID пользователя изменившего',
                createdBy: 'ID пользователя создавшего',
                randomNewDisplayName: 'Сгенерировать случайное новое отображаемое имя',
                validate: {
                    userId: 'Пожалуйста, введите ID пользователя',
                    oldDisplayName: 'Пожалуйста, введите старое отображаемое имя',
                    newDisplayName: 'Пожалуйста, введите новое отображаемое имя'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить запись истории #{historyId}?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        }
    },
    userNames: {
        management: {
            title: 'Управление информацией об именах пользователей',
            add: 'Добавить',
            edit: 'Редактировать',
            delete: 'Удалить',
            columns: {
                nameId: 'ID имени',
                userId: 'ID пользователя',
                createName: 'Созданное имя пользователя',
                displayName: 'Отображаемое имя',
                isDefaultDisplay: 'Отображение по умолчанию',
                createdAt: 'Дата создания',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                userId: 'ID пользователя',
                createName: 'Созданное имя пользователя',
                displayName: 'Отображаемое имя',
                isDefaultDisplay: 'Отображение по умолчанию',
                randomCreateName: 'Сгенерировать случайное созданное имя пользователя',
                randomDisplayName: 'Сгенерировать случайное отображаемое имя',
                validate: {
                    userId: 'Пожалуйста, введите ID пользователя',
                    createName: 'Пожалуйста, введите созданное имя пользователя',
                    displayName: 'Пожалуйста, введите отображаемое имя',
                    isDefaultDisplay: 'Пожалуйста, выберите'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить имя пользователя "{displayName}"?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        },
        common: {
            yes: 'Да',
            no: 'Нет'
        }
    },
    vipLevel: {
        management: {
            title: 'Настройка уровня VIP',
            add: 'Добавить',
            edit: 'Редактировать',
            delete: 'Удалить',
            columns: {
                levelId: 'ID уровня',
                vipLevel: 'Уровень VIP',
                levelName: 'Название уровня',
                minPoints: 'Минимальное количество баллов',
                maxPoints: 'Максимальное количество баллов',
                dailyPointsLimit: 'Ежедневный лимит',
                monthlyPointsLimit: 'Ежемесячный лимит',
                status: 'Статус',
                createdAt: 'Дата создания',
                action: 'Действие'
            },
            form: {
                basicInfo: 'Основная информация (обязательно)',
                extraInfo: 'Дополнительная информация (опционально)',
                vipLevel: 'Уровень VIP',
                levelName: 'Название уровня',
                minPoints: 'Минимальное количество баллов',
                maxPoints: 'Максимальное количество баллов',
                dailyPointsLimit: 'Ежедневный лимит',
                monthlyPointsLimit: 'Ежемесячный лимит',
                status: 'Статус',
                iconUrl: 'URL иконки',
                badgeColor: 'Цвет бейджа',
                benefitsJson: 'Настройка преимуществ (JSON)',
                maxPointsPlaceholder: 'Оставьте пустым для отсутствия лимита',
                iconUrlPlaceholder: 'Адрес ссылки на иконку',
                badgeColorPlaceholder: '#hex или название цвета',
                benefitsJsonPlaceholder: 'Формат JSON, например: {"discount": 0.9, "freeShipping": true}',
                validate: {
                    vipLevel: 'Пожалуйста, введите уровень VIP',
                    levelName: 'Пожалуйста, введите название уровня',
                    minPoints: 'Пожалуйста, введите минимальное количество баллов',
                    dailyPointsLimit: 'Пожалуйста, введите дневной лимит',
                    monthlyPointsLimit: 'Пожалуйста, введите месячный лимит',
                    status: 'Пожалуйста, выберите статус'
                }
            },
            messages: {
                loadFailed: 'Не удалось загрузить данные',
                deleteSuccess: 'Удаление успешно',
                deleteFailed: 'Удаление не удалось',
                updateSuccess: 'Обновление успешно',
                createSuccess: 'Создание успешно'
            },
            confirm: {
                delete: {
                    title: 'Подтвердить удаление',
                    content: 'Вы уверены, что хотите удалить уровень "{levelName}"?'
                }
            },
            pagination: {
                total: 'Всего {total} записей'
            }
        },
        common: {
            enabled: 'Включен',
            disabled: 'Отключен'
        }
    },
    userDetail: {
        title: 'Управление деталями пользователя',
        noData: 'Пожалуйста, найдите пользователя для просмотра деталей',
        basicInfo: 'Основная информация',
        profileInfo: 'Профиль',
        nameInfo: 'Информация об имени пользователя',
        pointsInfo: 'Информация о баллах',
        vipInfo: 'VIP информация',
        rolesInfo: 'Роли',
        nameHistory: 'История изменений имени',
        feedbackInfo: 'Обратная связь',
        licenseInfo: 'Лицензии пользователя',
        userId: 'ID пользователя',
        username: 'Имя пользователя',
        createdAt: 'Дата создания',
        nickname: 'Никнейм',
        email: 'Электронная почта',
        phone: 'Телефон',
        gender: 'Пол',
        genderMale: 'Мужской',
        genderFemale: 'Женский',
        genderOther: 'Другой',
        birthDate: 'Дата рождения',
        bio: 'Биография',
        createName: 'Созданное имя',
        displayName: 'Отображаемое имя',
        isDefaultDisplay: 'Отображение по умолчанию',
        totalPoints: 'Всего баллов',
        availablePoints: 'Доступные баллы',
        frozenPoints: 'Замороженные баллы',
        consumedPoints: 'Потраченные баллы',
        vipLevel: 'Уровень VIP',
        vipPoints: 'VIP баллы',
        totalEarnedPoints: 'Всего заработано баллов',
        vipStatus: 'Статус VIP',
        roleId: 'ID роли',
        roleName: 'Название роли',
        roleCode: 'Код роли',
        isSystemRole: 'Системная роль',
        status: 'Статус',
        historyId: 'ID истории',
        oldDisplayName: 'Старое отображаемое имя',
        newDisplayName: 'Новое отображаемое имя',
        changedAt: 'Время изменения',
        feedbackId: 'ID',
        feedbackType: 'Тип',
        feedbackContent: 'Содержимое',
        feedbackStatus: 'Статус',
        feedbackCreatedAt: 'Дата создания',
        licenseKey: 'Ключ лицензии',
        licenseType: 'Тип',
        licenseStatus: 'Статус',
        licenseStartTime: 'Время начала',
        licenseEndTime: 'Время окончания',
        search: {
            userId: 'ID пользователя',
            username: 'Имя пользователя',
            userIdPlaceholder: 'Введите ID пользователя',
            usernamePlaceholder: 'Введите имя пользователя',
            selectOne: 'Пожалуйста, введите ID пользователя или имя пользователя для поиска'
        },
        messages: {
            loadFailed: 'Не удалось получить детали пользователя',
            userNotFound: 'Пользователь не найден'
        }
    },
    profiles: {
        title: 'Управление профилями пользователей',
        addProfile: 'Добавить профиль',
        editProfile: 'Редактировать профиль',
        columns: {
            profileId: 'ID профиля',
            userId: 'ID пользователя',
            nickname: 'Никнейм',
            email: 'Электронная почта',
            phone: 'Телефон',
            gender: 'Пол',
            createdAt: 'Дата создания',
            action: 'Действие'
        },
        search: {
            userId: 'ID пользователя',
            nickname: 'Никнейм',
            email: 'Электронная почта',
            userIdPlaceholder: 'Введите ID пользователя',
            nicknamePlaceholder: 'Введите никнейм',
            emailPlaceholder: 'Введите электронную почту'
        },
        form: {
            basicInfo: 'Основная информация (обязательно)',
            extraInfo: 'Дополнительная информация (опционально)',
            userId: 'ID пользователя',
            nickname: 'Никнейм',
            email: 'Электронная почта',
            phone: 'Телефон',
            avatarUrl: 'URL аватара',
            birthDate: 'Дата рождения',
            gender: 'Пол',
            bio: 'Биография',
            userIdPlaceholder: 'Введите ID пользователя',
            nicknamePlaceholder: 'Введите никнейм',
            emailPlaceholder: 'Введите электронную почту',
            phonePlaceholder: 'Введите телефон',
            avatarUrlPlaceholder: 'Введите URL аватара',
            genderPlaceholder: 'Выберите пол',
            bioPlaceholder: 'Введите биографию',
            validate: {
                userId: 'Пожалуйста, введите ID пользователя'
            }
        },
        messages: {
            loadFailed: 'Не удалось загрузить данные',
            createSuccess: 'Создание успешно',
            updateSuccess: 'Обновление успешно',
            deleteSuccess: 'Удаление успешно',
            deleteFailed: 'Удаление не удалось',
            saveFailed: 'Сохранение не удалось'
        },
        confirm: {
            delete: {
                title: 'Подтвердить удаление',
                content: 'Вы уверены, что хотите удалить профиль "{nickname}"?'
            }
        },
        pagination: {
            total: 'Всего {total} записей'
        },
        genderMale: 'Мужской',
        genderFemale: 'Женский',
        genderOther: 'Другой'
    },
    licenses: {
        title: 'Управление лицензиями',
        assignLicense: 'Назначить лицензию',
        detailTitle: 'Детали лицензии',
        activationCode: 'Код активации',
        columns: {
            licenseKey: 'Ключ лицензии',
            userName: 'Имя пользователя',
            companyName: 'Название компании',
            contactEmail: 'Контактная электронная почта',
            licenseType: 'Тип',
            status: 'Статус',
            startTime: 'Время начала',
            endTime: 'Время окончания',
            productVersion: 'Версия продукта',
            maxConcurrentUsers: 'Макс. одновременных пользователей',
            features: 'Функции',
            remarks: 'Примечания',
            action: 'Действие'
        },
        search: {
            licenseKey: 'Ключ лицензии',
            licenseKeyPlaceholder: 'Введите ключ лицензии'
        },
        form: {
            licenseKey: 'Ключ лицензии',
            userId: 'ID пользователя',
            licenseKeyPlaceholder: 'Введите ключ лицензии',
            userIdPlaceholder: 'Введите ID пользователя',
            validate: {
                required: 'Пожалуйста, заполните ключ лицензии и ID пользователя'
            }
        },
        type: {
            trial: 'Пробная',
            standard: 'Стандартная',
            professional: 'Профессиональная',
            enterprise: 'Корпоративная'
        },
        status: {
            active: 'Активна',
            expired: 'Истекла',
            disabled: 'Отключена'
        },
        messages: {
            loadFailed: 'Не удалось загрузить данные',
            enterLicenseKey: 'Пожалуйста, введите ключ лицензии для поиска',
            notFound: 'Лицензия не найдена',
            disableSuccess: 'Отключение успешно',
            disableFailed: 'Отключение не удалось',
            enableSuccess: 'Включение успешно',
            enableFailed: 'Включение не удалось',
            generateCodeFailed: 'Не удалось сгенерировать код активации',
            assignSuccess: 'Назначение успешно',
            assignFailed: 'Назначение не удалось'
        },
        confirm: {
            disable: {
                title: 'Подтвердить отключение',
                content: 'Вы уверены, что хотите отключить лицензию "{licenseKey}"?'
            }
        },
        pagination: {
            total: 'Всего {total} записей'
        }
    }
} as const
