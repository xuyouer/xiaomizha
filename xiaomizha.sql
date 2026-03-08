
-- 

-- 01. 用户表 users : 存储用户的账户信息, 如用户名、密码等信息
-- 02. 用户详细资料表 user_profiles : 存储用户的详细信息, 如用户昵称、头像、邮箱等详细信息
-- 03. 用户日志表 user_logs : 存储用户的操作日志信息, 如登录、修改、注销等信息
-- 04. 用户积分表 user_points : 存储用户的积分信息
-- 05. 用户会员信息表 user_vip_info : 存储用户会员信息

-- XIAOMIZHA





-- ============================================
-- 数据库
-- ============================================

-- CREATE DATABASE IF NOT EXISTS `xiaomizha` 
-- DEFAULT CHARACTER SET utf8mb4 
-- DEFAULT COLLATE utf8mb4_unicode_ci;
-- 
-- USE `xiaomizha`;












-- ============================================
-- 数据表
-- ============================================

-- 用户表 users : 存储用户的账户信息, 如用户名、密码等信息
CREATE TABLE IF NOT EXISTS `users` (
    `user_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '用户ID',
	`username` VARCHAR(255) NOT NULL COMMENT '账户名',
	`password_hash` VARCHAR(255) NOT NULL COMMENT '密码哈希值',
    `account_status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '账户状态(1-正常,0-禁用)',
	
	`created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '建档时间',
	`updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
	
	PRIMARY KEY (`user_id`),
	UNIQUE KEY `idx_username` (`username`),
    KEY `idx_account_status` (`account_status`)
) ENGINE = INNODB AUTO_INCREMENT = 10000 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户表';

-- 用户名信息表 user_names : 存储用户的创建名和显示名
CREATE TABLE IF NOT EXISTS `user_names` (
    `name_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '名称ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `create_name` VARCHAR(255) NOT NULL COMMENT '创建用户名',
    `display_name` VARCHAR(255) NOT NULL COMMENT '显示名称',
    `is_default_display` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否使用显示名作为默认显示(1-是,0-否)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '建档时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
    
    PRIMARY KEY (`name_id`),
    UNIQUE KEY `idx_create_name` (`create_name`),
    UNIQUE KEY `idx_user_id` (`user_id`),
    KEY `idx_display_name` (`display_name`),
    CONSTRAINT `fk_user_names_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户名信息表';

-- 用户名历史表 user_name_history : 存储用户名变更历史
CREATE TABLE IF NOT EXISTS `user_name_history` (
    `history_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '历史ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `old_display_name` VARCHAR(255) NOT NULL COMMENT '原显示名称',
    `new_display_name` VARCHAR(255) NOT NULL COMMENT '新显示名称',
    `changed_by` BIGINT DEFAULT NULL COMMENT '修改人用户ID',
    `changed_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '修改时间',
    
    PRIMARY KEY (`history_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_changed_at` (`changed_at`),
    CONSTRAINT `fk_user_name_history_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_name_history_changed_by` FOREIGN KEY (`changed_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户名变更历史表';

-- 用户登录记录表 user_login_records : 存储用户的登录IP及时间
CREATE TABLE IF NOT EXISTS `user_login_records` (
    `login_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '登录记录ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `ip_address` VARCHAR(45) NOT NULL COMMENT '登录IP地址',
    `user_agent` VARCHAR(500) DEFAULT NULL COMMENT '用户代理(浏览器信息)',
    `device_info` VARCHAR(100) DEFAULT NULL COMMENT '设备信息',
    `login_type` ENUM('LOGIN', 'AUTO_LOGIN', 'TOKEN_REFRESH') NOT NULL DEFAULT 'LOGIN' COMMENT '登录类型',
    `login_status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '登录状态(1成功/0失败)',
    `failure_reason` VARCHAR(255) DEFAULT NULL COMMENT '失败原因(仅当登录失败时记录)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '登录时间',
    
    PRIMARY KEY (`login_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_ip_address` (`ip_address`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_user_login_time` (`user_id`, `created_at`),
    CONSTRAINT `fk_user_login_records_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户登录记录表';

-- 用户积分表 user_points : 存储用户的积分信息
CREATE TABLE IF NOT EXISTS `user_points` (
    `points_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '积分记录ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `total_points` INT NOT NULL DEFAULT 0 COMMENT '总积分',
    `available_points` INT NOT NULL DEFAULT 0 COMMENT '可用积分',
    `frozen_points` INT NOT NULL DEFAULT 0 COMMENT '冻结积分',
    `consumed_points` INT NOT NULL DEFAULT 0 COMMENT '已消费积分',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
    
    PRIMARY KEY (`points_id`),
    UNIQUE KEY `idx_user_id` (`user_id`),
    KEY `idx_total_points` (`total_points`),
    KEY `idx_available_points` (`available_points`),
    CONSTRAINT `fk_user_points_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户积分表';

-- 用户会员信息表 user_vip_info : 存储用户会员信息
CREATE TABLE IF NOT EXISTS `user_vip_info` (
    `vip_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '会员信息ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `vip_level` TINYINT NOT NULL DEFAULT 0 COMMENT 'VIP等级(0-普通用户,1-VIP1,2-VIP2,...)',
    `vip_points` INT NOT NULL DEFAULT 0 COMMENT 'VIP成长值/积分',
    `next_level_required` INT DEFAULT NULL COMMENT '升级到下一级所需成长值',
    `total_earned_points` INT NOT NULL DEFAULT 0 COMMENT '累计获得成长值(历史累计, 不减少)',
    `points_today` INT NOT NULL DEFAULT 0 COMMENT '今日已获得成长值(每日重置)',
    `points_this_month` INT NOT NULL DEFAULT 0 COMMENT '本月已获得成长值(每月重置)',
    `last_points_date` DATE DEFAULT NULL COMMENT '最后获取成长值日期',
    `vip_expire_date` DATE DEFAULT NULL COMMENT 'VIP到期日期(会员权益有效期)',
    `level_expire_date` DATE DEFAULT NULL COMMENT '等级有效期(高等级到期后降级)',
    `vip_status` ENUM('INACTIVE', 'ACTIVE', 'EXPIRED', 'SUSPENDED') NOT NULL DEFAULT 'INACTIVE' COMMENT 'VIP状态',
    `vip_upgrade_date` DATETIME (6) DEFAULT NULL COMMENT 'VIP升级日期',
    `total_recharge_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '累计充值金额',
    `last_recharge_date` DATETIME (6) DEFAULT NULL COMMENT '最后充值时间',
    `last_recharge_amount` DECIMAL(10, 2) NOT NULL DEFAULT 0.00 COMMENT '最后充值金额',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
    
    PRIMARY KEY (`vip_id`),
    UNIQUE KEY `idx_user_id` (`user_id`),
    KEY `idx_vip_level` (`vip_level`),
    KEY `idx_vip_status` (`vip_status`),
    KEY `idx_vip_expire_date` (`vip_expire_date`),
    KEY `idx_level_expire_date` (`level_expire_date`),
    KEY `idx_vip_points` (`vip_points`),
    KEY `idx_combined_status` (`vip_status`, `vip_level`),
    CONSTRAINT `fk_user_vip_info_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户会员信息表';

-- 用户详细资料表 user_profiles : 存储用户的详细信息, 如用户昵称、头像、邮箱等详细信息
CREATE TABLE IF NOT EXISTS `user_profiles` (
    `profile_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '资料ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `nickname` VARCHAR(50) DEFAULT NULL COMMENT '用户昵称',
    `email` VARCHAR(100) DEFAULT NULL COMMENT '电子邮箱',
    `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号码',
    `avatar_url` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    `birth_date` DATE DEFAULT NULL COMMENT '出生日期',
    `gender` ENUM('MALE','FEMALE','OTHER','UNKNOWN') DEFAULT 'UNKNOWN' COMMENT '性别',
    `bio` VARCHAR(255) DEFAULT NULL COMMENT '个人简介',
	
	`created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '建档时间',
	`updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
	
	PRIMARY KEY (`profile_id`),
    UNIQUE KEY `idx_user_id` (`user_id`),
    UNIQUE KEY `idx_email` (`email`),
    UNIQUE KEY `idx_phone` (`phone`),
    KEY `idx_nickname` (`nickname`),
	CONSTRAINT `fk_user_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户表';

-- 用户角色表 user_roles : 存储用户身份角色信息
CREATE TABLE IF NOT EXISTS `user_roles` (
    `role_id` INT NOT NULL AUTO_INCREMENT COMMENT '角色ID',
    `role_name` VARCHAR(50) NOT NULL COMMENT '角色名称',
    `role_code` VARCHAR(50) NOT NULL COMMENT '角色代码(用于程序识别)',
    `role_description` VARCHAR(255) DEFAULT NULL COMMENT '角色描述',
    `is_system_role` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否为系统内置角色(1-是,0-否)',
    `is_default` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否默认角色(新用户自动分配)',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序序号',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态(1-启用,0-禁用)',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    `deleted_at` DATETIME(6) DEFAULT NULL COMMENT '删除时间(软删除)',
    
    PRIMARY KEY (`role_id`),
    UNIQUE KEY `idx_role_code` (`role_code`),
    UNIQUE KEY `idx_role_name` (`role_name`),
    KEY `idx_status` (`status`),
    KEY `idx_is_system` (`is_system_role`),
    KEY `idx_is_default` (`is_default`),
    KEY `idx_sort_order` (`sort_order`),
    KEY `idx_deleted_at` (`deleted_at`)
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户角色表';

-- 用户角色关联表 user_role_relations : 关联用户与角色
CREATE TABLE IF NOT EXISTS `user_role_relations` (
    `relation_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `role_id` INT NOT NULL COMMENT '角色ID',
    `assigned_by` BIGINT DEFAULT NULL COMMENT '分配人用户ID',
    `expires_at` DATETIME(6) DEFAULT NULL COMMENT '角色到期时间',
    `is_primary` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否主角色(1-是,0-否)',
    `status` ENUM('INACTIVE', 'ACTIVE', 'EXPIRED', 'REVOKED') NOT NULL DEFAULT 'INACTIVE' COMMENT '关联状态',
    `revoke_reason` VARCHAR(255) DEFAULT NULL COMMENT '撤销原因',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    
    PRIMARY KEY (`relation_id`),
    UNIQUE KEY `idx_user_role` (`user_id`, `role_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_role_id` (`role_id`),
    KEY `idx_status` (`status`),
    KEY `idx_is_primary` (`is_primary`),
    KEY `idx_expires_at` (`expires_at`),
    KEY `idx_user_status` (`user_id`, `status`),
    CONSTRAINT `fk_user_role_relations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_role_relations_role` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_role_relations_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户角色关联表';

-- 用户资源表 user_resources : 存储系统资源信息(目录、菜单、按钮、接口等)
CREATE TABLE IF NOT EXISTS `user_resources` (
    `resource_id` INT NOT NULL AUTO_INCREMENT COMMENT '资源ID',
    `resource_name` VARCHAR(100) NOT NULL COMMENT '资源名称',
    `resource_code` VARCHAR(100) NOT NULL COMMENT '资源代码(唯一标识)',
    `resource_description` VARCHAR(255) DEFAULT NULL COMMENT '资源描述',
    `resource_category` ENUM('CATALOG', 'MENU', 'BUTTON', 'API', 'PAGE', 'MODULE', 'OTHER') NOT NULL DEFAULT 'MENU' COMMENT '资源类型(目录、菜单、按钮、接口、页面、模块、其他)',
    `resource_path` VARCHAR(500) DEFAULT NULL COMMENT '资源路径(路由路径或API路径)',
    `resource_component` VARCHAR(500) DEFAULT NULL COMMENT '组件路径(前端组件路径)',
    `resource_icon` VARCHAR(100) DEFAULT NULL COMMENT '资源图标',
    `parent_id` INT DEFAULT NULL COMMENT '父级资源ID(用于构建树形结构)',
    `level` TINYINT NOT NULL DEFAULT 1 COMMENT '资源层级(从1开始)',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序序号(同级资源排序)',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态(1-启用,0-禁用)',
    `visible` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否可见(1-可见,0-隐藏)',
    `is_system` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否为系统内置资源(1-是,0-否)',
    `permission_flag` VARCHAR(100) DEFAULT NULL COMMENT '权限标识(用于权限验证)',
    `requires_auth` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否需要认证(1-是,0-否)',
    `keep_alive` TINYINT(1) DEFAULT NULL COMMENT '是否缓存页面(仅对页面类型有效)',
    `external_link` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否外部链接(1-是,0-否)',
    `target` ENUM('_self', '_blank', '_parent', '_top') DEFAULT '_self' COMMENT '链接打开方式',
    `badge` VARCHAR(20) DEFAULT NULL COMMENT '徽章内容(如未读数量)',
    `badge_type` ENUM('danger', 'warning', 'success', 'info', 'primary') DEFAULT 'danger' COMMENT '徽章类型',
    `meta_json` JSON DEFAULT NULL COMMENT '元数据(JSON格式, 可扩展存储额外信息)',
    `create_by` BIGINT DEFAULT NULL COMMENT '创建人用户ID',
    `update_by` BIGINT DEFAULT NULL COMMENT '更新人用户ID',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    `deleted_at` DATETIME(6) DEFAULT NULL COMMENT '删除时间(软删除)',
    
    PRIMARY KEY (`resource_id`),
    UNIQUE KEY `idx_resource_code` (`resource_code`),
    UNIQUE KEY `idx_resource_path` (`resource_path`(191)),
    KEY `idx_parent_id` (`parent_id`),
    KEY `idx_resource_category` (`resource_category`),
    KEY `idx_sort_order` (`sort_order`),
    KEY `idx_status` (`status`),
    KEY `idx_visible` (`visible`),
    KEY `idx_level` (`level`),
    KEY `idx_create_by` (`create_by`),
    KEY `idx_update_by` (`update_by`),
    KEY `idx_deleted_at` (`deleted_at`),
    CONSTRAINT `fk_user_resources_parent` FOREIGN KEY (`parent_id`) REFERENCES `user_resources` (`resource_id`) ON DELETE SET NULL,
    CONSTRAINT `fk_user_resources_creator` FOREIGN KEY (`create_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    CONSTRAINT `fk_user_resources_updater` FOREIGN KEY (`update_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户资源表';

-- 用户资源关联表 user_resource_relations : 关联用户与资源(直接授权)
CREATE TABLE IF NOT EXISTS `user_resource_relations` (
    `relation_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `resource_id` INT NOT NULL COMMENT '资源ID',
    `permission_type` ENUM('READ', 'WRITE', 'DELETE', 'EXECUTE', 'MANAGE', 'ALL') NOT NULL DEFAULT 'READ' COMMENT '权限类型',
    `grant_type` ENUM('DIRECT', 'INHERITED', 'ROLE_BASED') NOT NULL DEFAULT 'DIRECT' COMMENT '授权类型(直接授权、继承授权、基于角色)',
    `source_id` INT DEFAULT NULL COMMENT '授权来源ID(如角色ID、用户组ID)',
    `source_type` VARCHAR(50) DEFAULT NULL COMMENT '授权来源类型(ROLE, GROUP等)',
    `expires_at` DATETIME(6) DEFAULT NULL COMMENT '权限到期时间',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否激活(1-是,0-否)',
    `priority` TINYINT NOT NULL DEFAULT 50 COMMENT '权限优先级(1-99, 数字越大优先级越高)',
    `condition_json` JSON DEFAULT NULL COMMENT '权限条件(JSON格式, 如时间范围、数据范围等)',
    `granted_by` BIGINT DEFAULT NULL COMMENT '授权人用户ID',
    `grant_reason` VARCHAR(255) DEFAULT NULL COMMENT '授权原因',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    `revoked_at` DATETIME(6) DEFAULT NULL COMMENT '撤销时间',
    `revoked_by` BIGINT DEFAULT NULL COMMENT '撤销人用户ID',
    `revoke_reason` VARCHAR(255) DEFAULT NULL COMMENT '撤销原因',
    
    PRIMARY KEY (`relation_id`),
    UNIQUE KEY `idx_user_resource_permission` (`user_id`, `resource_id`, `permission_type`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_resource_id` (`resource_id`),
    KEY `idx_permission_type` (`permission_type`),
    KEY `idx_grant_type` (`grant_type`),
    KEY `idx_is_active` (`is_active`),
    KEY `idx_expires_at` (`expires_at`),
    KEY `idx_priority` (`priority`),
    KEY `idx_source` (`source_id`, `source_type`),
    KEY `idx_granted_by` (`granted_by`),
    KEY `idx_revoked_at` (`revoked_at`),
    KEY `idx_user_active` (`user_id`, `is_active`),
    CONSTRAINT `fk_user_resource_relations_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_resource_relations_resource` FOREIGN KEY (`resource_id`) REFERENCES `user_resources` (`resource_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_resource_relations_granted_by` FOREIGN KEY (`granted_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
    CONSTRAINT `fk_user_resource_relations_revoked_by` FOREIGN KEY (`revoked_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '用户资源关联表(直接授权)';

-- 角色资源关联表 role_resource_relations : 关联角色与资源
CREATE TABLE IF NOT EXISTS `role_resource_relations` (
    `relation_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '关联ID',
    `role_id` INT NOT NULL COMMENT '角色ID',
    `resource_id` INT NOT NULL COMMENT '资源ID',
    `permission_type` ENUM('READ', 'WRITE', 'DELETE', 'EXECUTE', 'MANAGE', 'ALL') NOT NULL DEFAULT 'READ' COMMENT '权限类型',
    `condition_json` JSON DEFAULT NULL COMMENT '权限条件(JSON格式)',
    `is_inheritable` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否可继承给子角色(1-是,0-否)',
    `priority` TINYINT NOT NULL DEFAULT 50 COMMENT '权限优先级',
    `granted_by` BIGINT DEFAULT NULL COMMENT '授权人用户ID',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态(1-启用,0-禁用)',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    
    PRIMARY KEY (`relation_id`),
    UNIQUE KEY `idx_role_resource_permission` (`role_id`, `resource_id`, `permission_type`),
    KEY `idx_role_id` (`role_id`),
    KEY `idx_resource_id` (`resource_id`),
    KEY `idx_permission_type` (`permission_type`),
    KEY `idx_is_inheritable` (`is_inheritable`),
    KEY `idx_status` (`status`),
    KEY `idx_priority` (`priority`),
    KEY `idx_granted_by` (`granted_by`),
    CONSTRAINT `fk_role_resource_relations_role` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`role_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_role_resource_relations_resource` FOREIGN KEY (`resource_id`) REFERENCES `user_resources` (`resource_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_role_resource_relations_granted_by` FOREIGN KEY (`granted_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '角色资源关联表';

-- 用户日志表 user_logs : 存储用户的操作日志信息, 如登录、修改、注销等信息
CREATE TABLE IF NOT EXISTS `user_logs` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '日志ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
	`level` ENUM('INFO', 'WARNING', 'ERROR', 'CRITICAL') NOT NULL DEFAULT 'INFO' COMMENT '日志级别',
	`action` VARCHAR(50) NOT NULL COMMENT '操作类型(登录/登出/修改资料等)',
	`ip_address` VARCHAR(45) DEFAULT NULL COMMENT '操作IP地址',
	`user_agent` VARCHAR(500) DEFAULT NULL COMMENT '用户代理(浏览器信息)',
    `device_info` VARCHAR(100) DEFAULT NULL COMMENT '设备信息',
	`details` TEXT DEFAULT NULL COMMENT '操作详情',
	`status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '操作状态(1成功/0失败)',
	
	`created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '建档时间',
	`updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',

    PRIMARY KEY (`log_id`),
    KEY `idx_user_id` (`user_id`),
    CONSTRAINT `fk_user_logs_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户操作日志表';

-- 用户积分变更记录表 user_points_log : 存储用户积分变更记录
CREATE TABLE IF NOT EXISTS `user_points_log` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '积分记录ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `points_change` INT NOT NULL COMMENT '积分变更值(正数为增加,负数为减少)',
    `points_type` ENUM('SIGN_IN', 'TASK', 'PURCHASE', 'CONSUME', 'ADMIN_ADJUST', 'REFUND', 'OTHER') NOT NULL COMMENT '积分类型',
    `current_total` INT NOT NULL COMMENT '变更后总积分',
    `current_available` INT NOT NULL COMMENT '变更后可用积分',
    `description` VARCHAR(255) NOT NULL COMMENT '变更描述',
    `reference_id` VARCHAR(100) DEFAULT NULL COMMENT '关联业务ID',
    `operator_id` BIGINT DEFAULT NULL COMMENT '操作人用户ID(系统操作为NULL)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    
    PRIMARY KEY (`log_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_points_type` (`points_type`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_reference_id` (`reference_id`),
    CONSTRAINT `fk_user_points_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_points_log_operator` FOREIGN KEY (`operator_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户积分变更记录表';

-- 用户会员变更记录表 user_vip_log : 存储用户会员等级变更记录
CREATE TABLE IF NOT EXISTS `user_vip_log` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '会员记录ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `old_vip_level` TINYINT NOT NULL COMMENT '原VIP等级',
    `new_vip_level` TINYINT NOT NULL COMMENT '新VIP等级',
    `old_vip_points` INT NOT NULL COMMENT '原VIP成长值',
    `new_vip_points` INT NOT NULL COMMENT '新VIP成长值',
    `change_type` ENUM('UPGRADE', 'DOWNGRADE', 'POINTS_CHANGE', 'EXPIRE', 'RENEW', 'MANUAL_ADJUST') NOT NULL COMMENT '变更类型',
    `change_reason` VARCHAR(255) NOT NULL COMMENT '变更原因',
    `operator_id` BIGINT DEFAULT NULL COMMENT '操作人用户ID(系统操作为NULL)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    
    PRIMARY KEY (`log_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_change_type` (`change_type`),
    KEY `idx_created_at` (`created_at`),
    CONSTRAINT `fk_user_vip_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_vip_log_operator` FOREIGN KEY (`operator_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户会员变更记录表';

-- ============================================
-- VIP会员积分体系设计
-- ============================================

-- VIP等级配置表
CREATE TABLE IF NOT EXISTS `vip_level_config` (
    `level_id` INT NOT NULL AUTO_INCREMENT COMMENT '等级ID',
    `vip_level` TINYINT NOT NULL COMMENT 'VIP等级(0-普通用户,1-10为VIP等级)',
    `level_name` VARCHAR(50) NOT NULL COMMENT '等级名称',
    `min_points` INT NOT NULL COMMENT '升级所需最小成长值',
    `max_points` INT DEFAULT NULL COMMENT '升级所需最大成长值(为空表示无上限)',
    `icon_url` VARCHAR(255) DEFAULT NULL COMMENT '等级图标URL',
    `badge_color` VARCHAR(20) DEFAULT NULL COMMENT '徽章颜色',
    `daily_points_limit` INT NOT NULL DEFAULT 100 COMMENT '每日成长值获取上限',
    `monthly_points_limit` INT NOT NULL DEFAULT 1000 COMMENT '每月成长值获取上限',
    `benefits_json` JSON DEFAULT NULL COMMENT '等级特权(JSON格式)',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态(1-启用,0-禁用)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '更新时间',
    
    PRIMARY KEY (`level_id`),
    UNIQUE KEY `idx_vip_level` (`vip_level`),
    KEY `idx_status` (`status`)
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = 'VIP等级配置表';

-- 成长值获取规则表
CREATE TABLE IF NOT EXISTS `vip_points_rules` (
    `rule_id` INT NOT NULL AUTO_INCREMENT COMMENT '规则ID',
    `rule_code` VARCHAR(50) NOT NULL COMMENT '规则代码',
    `rule_name` VARCHAR(100) NOT NULL COMMENT '规则名称',
    `points_value` INT NOT NULL COMMENT '成长值',
    `points_type` ENUM('DAILY', 'ONCE', 'EVERYTIME') NOT NULL COMMENT '类型(DAILY-每日,ONCE-仅一次,EVERYTIME-每次)',
    `max_times_per_day` INT DEFAULT NULL COMMENT '每日最多次数',
    `max_times_total` INT DEFAULT NULL COMMENT '总次数限制',
    `require_vip_level` TINYINT DEFAULT 0 COMMENT '所需最低VIP等级',
    `cooldown_seconds` INT DEFAULT 0 COMMENT '冷却时间(秒)',
    `description` VARCHAR(255) NOT NULL COMMENT '规则描述',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态(1-启用,0-禁用)',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '更新时间',
    
    PRIMARY KEY (`rule_id`),
    UNIQUE KEY `idx_rule_code` (`rule_code`),
    KEY `idx_points_type` (`points_type`),
    KEY `idx_status` (`status`)
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '成长值获取规则表';

-- 用户成长值获取记录表
CREATE TABLE IF NOT EXISTS `user_vip_points_log` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '记录ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `rule_id` INT NOT NULL COMMENT '规则ID',
    `rule_code` VARCHAR(50) NOT NULL COMMENT '规则代码',
    `points_earned` INT NOT NULL COMMENT '获取的成长值',
    `current_vip_points` INT NOT NULL COMMENT '当前总成长值',
    `current_vip_level` TINYINT NOT NULL COMMENT '当前VIP等级',
    `reference_id` VARCHAR(100) DEFAULT NULL COMMENT '关联业务ID',
    `reference_type` VARCHAR(50) DEFAULT NULL COMMENT '关联业务类型',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    
    PRIMARY KEY (`log_id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_rule_id` (`rule_id`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_user_created` (`user_id`, `created_at`),
    CONSTRAINT `fk_user_vip_points_log_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_vip_points_log_rule` FOREIGN KEY (`rule_id`) REFERENCES `vip_points_rules` (`rule_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '用户成长值获取记录表';

-- 系统配置表
CREATE TABLE IF NOT EXISTS `system_configs` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `config_key` VARCHAR(100) NOT NULL COMMENT '配置键',
    `config_value` TEXT NOT NULL COMMENT '配置值',
    `config_type` VARCHAR(20) DEFAULT 'string' COMMENT '配置类型: string, number, boolean, json',
    `description` VARCHAR(255) DEFAULT NULL COMMENT '配置描述',
    `is_public` BOOLEAN DEFAULT FALSE COMMENT '是否为公开配置',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '更新时间',
	
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_config_key` (`config_key`),
    KEY `idx_is_public` (`is_public`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- 用户反馈表
CREATE TABLE IF NOT EXISTS `user_feedback` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '反馈ID',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `type` TINYINT NOT NULL COMMENT '反馈类型: 1-系统问题, 2-功能建议, 3-BUG反馈, 4-其他',
    `content` TEXT NOT NULL COMMENT '反馈内容',
    `contact_info` VARCHAR(100) DEFAULT NULL COMMENT '联系方式',
    `status` TINYINT DEFAULT 1 COMMENT '状态: 1-待处理, 2-已受理, 3-已解决, 4-已关闭',
    `reply` TEXT DEFAULT NULL COMMENT '回复内容',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '更新时间',
    
    PRIMARY KEY (`id`),
    KEY `idx_user_id` (`user_id`),
    KEY `idx_status` (`status`),
    KEY `idx_created_at` (`created_at`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户反馈表';

-- License授权系统表
CREATE TABLE IF NOT EXISTS `license_info` (
    `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'LicenseID',
    `license_key` VARCHAR(255) NOT NULL COMMENT '许可证密钥(唯一标识)',
    `license_id` VARCHAR(100) NOT NULL COMMENT '许可证ID(用于标识)',
    `user_name` VARCHAR(100) NOT NULL COMMENT '用户名',
    `company_name` VARCHAR(255) NOT NULL COMMENT '公司名',
    `contact_email` VARCHAR(255) COMMENT '联系邮箱(便于通知)',
    `product_version` VARCHAR(50) NOT NULL COMMENT '产品版本',
    `features` JSON COMMENT '授权功能列表',
    `start_time` DATETIME NOT NULL COMMENT '有效期开始时间',
    `end_time` DATETIME NOT NULL COMMENT '有效期结束时间',
    `hardware_info` TEXT COMMENT '硬件绑定信息',
    `license_type` ENUM('TRIAL', 'BASIC', 'PREMIUM', 'STANDARD', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM') NOT NULL DEFAULT 'TRIAL' COMMENT '许可证类型',
    `max_concurrent_users` INT DEFAULT NULL COMMENT '最大并发用户数(为空表示无上限)',
    `allow_offline` BOOLEAN DEFAULT FALSE COMMENT '是否允许离线使用',
    `status` ENUM('ACTIVE', 'EXPIRED', 'REVOKED', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'INACTIVE' COMMENT '许可证状态',
    `activation_code` VARCHAR(255) COMMENT '激活码(用于激活许可证)',
    `last_activation_time` DATETIME COMMENT '最后激活时间',
    `created_by` VARCHAR(100) COMMENT '创建人',
    `updated_by` VARCHAR(100) COMMENT '更新人',
    `remarks` TEXT COMMENT '备注信息',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
    `updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
    
    PRIMARY KEY (`id`),
	UNIQUE KEY `idx_license_key_uk` (`license_key`),
	UNIQUE KEY `idx_license_id_uk` (`license_id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_end_time` (`end_time`),
    INDEX `idx_license_key` (`license_key`),
    INDEX `idx_license_id` (`license_id`),
    INDEX `idx_contact_email` (`contact_email`),
    INDEX `idx_license_type` (`license_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='License授权系统表';

-- License使用记录表
CREATE TABLE IF NOT EXISTS `license_usage_log` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '许可证记录ID',
    `license_key` VARCHAR(255) NOT NULL COMMENT '许可证密钥',
    `action` ENUM('ACTIVATE', 'VALIDATE', 'CHECK') NOT NULL COMMENT '操作类型(ACTIVATE/VALIDATE/CHECK)',
    `ip_address` VARCHAR(45) DEFAULT NULL COMMENT '操作IP地址',
    `user_agent` VARCHAR(500) DEFAULT NULL COMMENT '用户代理(浏览器信息)',
    `device_info` VARCHAR(100) DEFAULT NULL COMMENT '设备信息',
    `details` TEXT DEFAULT NULL COMMENT '操作详情',
    `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '操作状态(1成功/0失败)',
    `failure_reason` VARCHAR(255) DEFAULT NULL COMMENT '失败原因(仅当操作失败时记录)',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '操作时间',
    
    PRIMARY KEY (`log_id`),
    INDEX `idx_license_key` (`license_key`),
    INDEX `idx_action` (`action`),
    INDEX `idx_status` (`status`),
    INDEX `idx_created_at` (`created_at`),
    CONSTRAINT `fk_license_usage_log_license` FOREIGN KEY (`license_key`) REFERENCES `license_info` (`license_key`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='License使用记录表';

-- License变更记录表
CREATE TABLE IF NOT EXISTS `license_change_log` (
    `log_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '许可证记录ID',
    `license_key` VARCHAR(255) NOT NULL COMMENT '许可证密钥',
    `change_type`  ENUM('CREATE', 'ACTIVATE', 'RENEW', 'REVOKE', 'SUSPEND', 'EXTEND') NOT NULL COMMENT '变更类型(CREATE/ACTIVATE/RENEW/REVOKE/SUSPEND/EXTEND)',
    `old_value` TEXT DEFAULT NULL COMMENT '变更前值',
    `new_value` TEXT DEFAULT NULL COMMENT '变更后值',
    `operator` VARCHAR(100) DEFAULT NULL COMMENT '操作人',
    `reason` VARCHAR(255) DEFAULT NULL COMMENT '变更原因',
    
    `created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '变更时间',
    
    PRIMARY KEY (`log_id`),
    INDEX `idx_license_key` (`license_key`),
    INDEX `idx_change_type` (`change_type`),
    INDEX `idx_created_at` (`created_at`),
    CONSTRAINT `fk_license_change_log_license` FOREIGN KEY (`license_key`) REFERENCES `license_info` (`license_key`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='License变更记录表';

-- License用户关联表
CREATE TABLE IF NOT EXISTS `license_user_relation` (
    `relation_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '许可证关联ID',
    `license_key` VARCHAR(255) NOT NULL COMMENT '许可证密钥',
    `user_id` BIGINT NOT NULL COMMENT '用户ID',
    `status` ENUM('ACTIVE', 'INACTIVE', 'EXPIRED') NOT NULL DEFAULT 'ACTIVE' COMMENT '关联状态',
    `assigned_by` BIGINT DEFAULT NULL COMMENT '分配人用户ID',
    `assigned_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '分配时间',
    `expires_at` DATETIME(6) DEFAULT NULL COMMENT '关联到期时间',
    `last_used_at` DATETIME(6) DEFAULT NULL COMMENT '最后使用时间',
    
    PRIMARY KEY (`relation_id`),
    INDEX `idx_license_key` (`license_key`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_status` (`status`),
    INDEX `idx_expires_at` (`expires_at`),
    INDEX `idx_last_used_at` (`last_used_at`),
    CONSTRAINT `fk_license_user_relation_license` FOREIGN KEY (`license_key`) REFERENCES `license_info` (`license_key`) ON DELETE CASCADE,
    CONSTRAINT `fk_license_user_relation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_license_user_relation_assigned_by` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='License用户关联表';

-- 签到表
CREATE TABLE IF NOT EXISTS `sign_in` (
    `sign_in_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '签到记录ID',
    `user_id` BIGINT NOT NULL COMMENT '关联用户ID',
    `sign_in_date` DATETIME NOT NULL COMMENT '签到日期',
    `continuous_days` INT NOT NULL DEFAULT 1 COMMENT '连续签到天数',
    `points_reward` INT NOT NULL COMMENT '签到获得的积分',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
    
    PRIMARY KEY (`sign_in_id`),
    UNIQUE KEY `idx_user_date` (`user_id`, `sign_in_date`),
    KEY `idx_user_id` (`user_id`),
    CONSTRAINT `fk_user_sign_in_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '签到表';

-- 签到配置表
CREATE TABLE IF NOT EXISTS `sign_in_config` (
    `config_id` INT NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `continuous_days` INT NOT NULL COMMENT '连续签到天数',
    `points_reward` INT NOT NULL COMMENT '对应积分奖励',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '是否启用',
    
    `created_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) COMMENT '创建时间',
    `updated_at` DATETIME (6) DEFAULT CURRENT_TIMESTAMP (6) ON UPDATE CURRENT_TIMESTAMP (6) COMMENT '最后更新时间',
    
    PRIMARY KEY (`config_id`)
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '签到配置表';

-- 签到状态表
CREATE TABLE IF NOT EXISTS `sign_in_status` (
	`status_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '状态ID',
	`user_id` BIGINT NOT NULL COMMENT '用户ID',
	`current_continuous_days` INT NOT NULL DEFAULT 0 COMMENT '当前连续签到天数',
	`last_sign_in_date` DATETIME DEFAULT NULL COMMENT '最后签到日期',
	`is_continuous` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '是否处于连续签到状态',
	`total_sign_ins` INT NOT NULL DEFAULT 0 COMMENT '总签到次数',
	`max_continuous_days` INT NOT NULL DEFAULT 0 COMMENT '历史最大连续签到天数',
	
	`created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
	`updated_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
	
	PRIMARY KEY (`status_id`),
	UNIQUE KEY `idx_user_id` (`user_id`),
	KEY `idx_is_continuous` (`is_continuous`),
	KEY `idx_last_sign_in_date` (`last_sign_in_date`),
	CONSTRAINT `fk_user_sign_in_status_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '签到状态表';

-- 月度签到报告表
CREATE TABLE IF NOT EXISTS `sign_in_monthly_report` (
	`report_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '报告ID',
	`report_month` VARCHAR(7) NOT NULL COMMENT '报告月份(YYYY-MM)',
	`user_id` BIGINT NOT NULL COMMENT '用户ID',
	`total_sign_ins` INT NOT NULL COMMENT '月度签到次数',
	`continuous_days` INT NOT NULL COMMENT '最大连续签到天数',
	`points_earned` INT NOT NULL COMMENT '获得的积分',
	`rank` INT DEFAULT NULL COMMENT '月度排名',
	`created_at` DATETIME(6) DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
	PRIMARY KEY (`report_id`),
	UNIQUE KEY `idx_user_month` (`user_id`, `report_month`),
	KEY `idx_report_month` (`report_month`),
	KEY `idx_rank` (`rank`),
	CONSTRAINT `fk_sign_in_monthly_report_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE = INNODB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT = '月度签到报告表';


















-- ============================================
-- 视图
-- ============================================

-- 用户最后登录信息
CREATE VIEW `user_last_login_view` AS
SELECT 
    ulr.user_id,
    ulr.ip_address AS last_login_ip,
    ulr.created_at AS last_login_time,
    ulr.user_agent AS last_login_user_agent,
    ulr.device_info AS last_login_device
FROM user_login_records ulr
INNER JOIN (
    SELECT user_id, MAX(created_at) AS max_created_at
    FROM user_login_records
    WHERE login_status = 1
    GROUP BY user_id
) latest ON ulr.user_id = latest.user_id AND ulr.created_at = latest.max_created_at;

-- 用户完整信息(包含最后登录信息、积分和VIP信息)
CREATE VIEW `user_complete_info_view` AS
SELECT 
    u.user_id,
    u.username,
    u.account_status,
    un.create_name,
    un.display_name,
    up.nickname,
    up.email,
    up.phone,
    up2.total_points,
    up2.available_points,
    vi.vip_level,
    vi.vip_status,
    vi.vip_expire_date,
    ull.last_login_ip,
    ull.last_login_time,
    u.created_at AS account_created_at,
    u.updated_at AS account_updated_at
FROM users u
LEFT JOIN user_names un ON u.user_id = un.user_id
LEFT JOIN user_profiles up ON u.user_id = up.user_id
LEFT JOIN user_points up2 ON u.user_id = up2.user_id
LEFT JOIN user_vip_info vi ON u.user_id = vi.user_id
LEFT JOIN user_last_login_view ull ON u.user_id = ull.user_id;

-- 创建视图: VIP用户统计信息
CREATE VIEW `vip_user_stats_view` AS
SELECT 
    vip_level,
    vip_status,
    COUNT(*) as user_count,
    AVG(vip_points) as avg_vip_points,
    MIN(vip_points) as min_vip_points,
    MAX(vip_points) as max_vip_points,
    AVG(total_recharge_amount) as avg_recharge_amount,
    SUM(total_recharge_amount) as total_recharge_amount
FROM user_vip_info
GROUP BY vip_level, vip_status
ORDER BY vip_level DESC;

-- 用户积分排行榜
CREATE VIEW `user_points_ranking_view` AS
SELECT 
    u.user_id,
    u.username,
    un.display_name,
    up.nickname,
    p.total_points,
    p.available_points,
    RANK() OVER (ORDER BY p.total_points DESC) as total_rank,
    RANK() OVER (ORDER BY p.available_points DESC) as available_rank
FROM users u
LEFT JOIN user_names un ON u.user_id = un.user_id
LEFT JOIN user_profiles up ON u.user_id = up.user_id
LEFT JOIN user_points p ON u.user_id = p.user_id
WHERE p.total_points > 0
ORDER BY p.total_points DESC;

-- 用户登录统计视图
CREATE VIEW `user_login_statistics_view` AS
SELECT 
    u.user_id,
    u.username,
    COUNT(ulr.login_id) as total_logins,
    SUM(CASE WHEN ulr.login_status = 1 THEN 1 ELSE 0 END) as successful_logins,
    SUM(CASE WHEN ulr.login_status = 0 THEN 1 ELSE 0 END) as failed_logins,
    MAX(ulr.created_at) as last_login_time,
    COUNT(DISTINCT ulr.ip_address) as distinct_ip_count
FROM users u
LEFT JOIN user_login_records ulr ON u.user_id = ulr.user_id
GROUP BY u.user_id, u.username;

-- 用户积分变动汇总视图
CREATE VIEW `user_points_summary_view` AS
SELECT 
    u.user_id,
    u.username,
    up.total_points,
    up.available_points,
    up.frozen_points,
    up.consumed_points,
    COUNT(upl.log_id) as total_changes,
    SUM(CASE WHEN upl.points_change > 0 THEN upl.points_change ELSE 0 END) as total_increased,
    SUM(CASE WHEN upl.points_change < 0 THEN ABS(upl.points_change) ELSE 0 END) as total_decreased
FROM users u
LEFT JOIN user_points up ON u.user_id = up.user_id
LEFT JOIN user_points_log upl ON u.user_id = upl.user_id
GROUP BY u.user_id, u.username, up.total_points, up.available_points, up.frozen_points, up.consumed_points;

-- 用户成长值获取汇总视图
CREATE VIEW `user_vip_points_summary_view` AS
SELECT 
    u.user_id,
    u.username,
    vi.vip_level,
    vi.vip_points,
    vi.total_earned_points,
    COUNT(uvpl.log_id) as total_earnings,
    SUM(uvpl.points_earned) as total_earned_amount,
    COUNT(DISTINCT uvpl.rule_code) as distinct_rule_count
FROM users u
LEFT JOIN user_vip_info vi ON u.user_id = vi.user_id
LEFT JOIN user_vip_points_log uvpl ON u.user_id = uvpl.user_id
GROUP BY u.user_id, u.username, vi.vip_level, vi.vip_points, vi.total_earned_points;

-- VIP到期提醒视图
CREATE VIEW `vip_expiration_reminder_view` AS
SELECT 
    u.user_id,
    u.username,
    un.display_name,
    vi.vip_level,
    vlc.level_name,
    vi.vip_status,
    vi.vip_expire_date,
    vi.level_expire_date,
    DATEDIFF(vi.vip_expire_date, CURDATE()) as days_to_vip_expire,
    DATEDIFF(vi.level_expire_date, CURDATE()) as days_to_level_expire,
    CASE 
        WHEN vi.vip_expire_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY) THEN 'VIP即将到期'
        WHEN vi.level_expire_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY) THEN '等级即将到期'
        WHEN vi.vip_expire_date < CURDATE() THEN 'VIP已过期'
        WHEN vi.level_expire_date < CURDATE() THEN '等级已过期'
        ELSE '正常'
    END as expiration_status
FROM users u
LEFT JOIN user_names un ON u.user_id = un.user_id
LEFT JOIN user_vip_info vi ON u.user_id = vi.user_id
LEFT JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level
WHERE vi.vip_status = 'ACTIVE' 
  AND (vi.vip_expire_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) 
       OR vi.level_expire_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
       OR vi.vip_expire_date < CURDATE()
       OR vi.level_expire_date < CURDATE());

-- 用户活跃度统计视图
CREATE VIEW `user_activity_summary_view` AS
SELECT 
    u.user_id,
    u.username,
    COUNT(DISTINCT DATE(ul.created_at)) as active_days,
    COUNT(ul.log_id) as total_actions,
    COUNT(CASE WHEN ul.action = 'LOGIN' THEN 1 END) as login_count,
    COUNT(CASE WHEN ul.action = 'UPDATE_PROFILE' THEN 1 END) as profile_update_count,
    MIN(ul.created_at) as first_activity_date,
    MAX(ul.created_at) as last_activity_date
FROM users u
LEFT JOIN user_logs ul ON u.user_id = ul.user_id
GROUP BY u.user_id, u.username;

-- ============================================
-- 用户角色相关视图
-- ============================================

-- 用户角色详情视图
CREATE VIEW `user_role_detail_view` AS
SELECT 
    urr.relation_id,
    urr.user_id,
    u.username,
    un.display_name,
    urr.role_id,
    ur.role_name,
    ur.role_code,
    ur.role_description,
    urr.is_primary,
    urr.status as relation_status,
    urr.expires_at,
    urr.created_at as assigned_at,
    urr.assigned_by,
    ass.username as assigned_by_username
FROM user_role_relations urr
JOIN users u ON urr.user_id = u.user_id
JOIN user_roles ur ON urr.role_id = ur.role_id
LEFT JOIN user_names un ON urr.user_id = un.user_id
LEFT JOIN users ass ON urr.assigned_by = ass.user_id
WHERE ur.status = 1 
  AND urr.status = 'ACTIVE'
  AND (urr.expires_at IS NULL OR urr.expires_at > NOW());

-- 用户所有角色汇总视图
CREATE VIEW `user_roles_summary_view` AS
SELECT 
    u.user_id,
    u.username,
    un.display_name,
    COUNT(urr.relation_id) as role_count,
    GROUP_CONCAT(DISTINCT ur.role_name ORDER BY ur.role_name SEPARATOR ', ') as role_names,
    GROUP_CONCAT(DISTINCT ur.role_code ORDER BY ur.role_code SEPARATOR ', ') as role_codes,
    MAX(CASE WHEN urr.is_primary = 1 THEN ur.role_name END) as primary_role,
    MIN(urr.created_at) as first_role_assigned_at,
    MAX(urr.created_at) as last_role_assigned_at
FROM users u
LEFT JOIN user_names un ON u.user_id = un.user_id
LEFT JOIN user_role_relations urr ON u.user_id = urr.user_id AND urr.status = 'ACTIVE'
LEFT JOIN user_roles ur ON urr.role_id = ur.role_id AND ur.status = 1
GROUP BY u.user_id, u.username, un.display_name;

-- 角色分配统计视图
CREATE VIEW `role_assignment_stats_view` AS
SELECT 
    ur.role_id,
    ur.role_name,
    ur.role_code,
    ur.role_description,
    COUNT(urr.relation_id) as assigned_count,
    COUNT(DISTINCT urr.user_id) as unique_users,
    COUNT(CASE WHEN urr.is_primary = 1 THEN 1 END) as primary_assignments,
    COUNT(CASE WHEN urr.status = 'ACTIVE' THEN 1 END) as active_assignments,
    COUNT(CASE WHEN urr.status = 'EXPIRED' THEN 1 END) as expired_assignments,
    COUNT(CASE WHEN urr.status = 'REVOKED' THEN 1 END) as revoked_assignments,
    MIN(urr.created_at) as first_assignment,
    MAX(urr.created_at) as last_assignment
FROM user_roles ur
LEFT JOIN user_role_relations urr ON ur.role_id = urr.role_id
WHERE ur.status = 1
GROUP BY ur.role_id, ur.role_name, ur.role_code, ur.role_description
ORDER BY ur.sort_order, ur.role_id;

-- ============================================
-- 用户资源相关视图
-- ============================================

-- 用户权限资源树视图
CREATE VIEW `user_permission_tree_view` AS
SELECT 
    ur.resource_id,
    ur.resource_name,
    ur.resource_code,
    ur.resource_description,
    ur.resource_category,
    ur.resource_path,
    ur.resource_component,
    ur.resource_icon,
    ur.parent_id,
    ur.level,
    ur.sort_order,
    ur.visible,
    ur.permission_flag,
    ur.requires_auth,
    ur.keep_alive,
    ur.external_link,
    ur.target,
    ur.badge,
    ur.badge_type,
    ur.meta_json,
    ur.status as resource_status
FROM user_resources ur
WHERE ur.status = 1 AND ur.deleted_at IS NULL
ORDER BY ur.level, ur.parent_id, ur.sort_order;

-- 用户直接权限视图
CREATE VIEW `user_direct_permissions_view` AS
SELECT 
    urr.user_id,
    u.username,
    urr.resource_id,
    ur.resource_name,
    ur.resource_code,
    ur.resource_category,
    ur.resource_path,
    urr.permission_type,
    urr.grant_type,
    urr.is_active,
    urr.expires_at,
    urr.created_at as granted_at,
    urr.granted_by,
    urr.grant_reason
FROM user_resource_relations urr
JOIN users u ON urr.user_id = u.user_id
JOIN user_resources ur ON urr.resource_id = ur.resource_id
WHERE urr.is_active = 1 
  AND ur.status = 1
  AND ur.deleted_at IS NULL
  AND (urr.expires_at IS NULL OR urr.expires_at > NOW());

-- 用户通过角色的权限视图
CREATE VIEW `user_role_permissions_view` AS
SELECT 
    urr.user_id,
    u.username,
    rrr.resource_id,
    ur.resource_name,
    ur.resource_code,
    ur.resource_category,
    ur.resource_path,
    rrr.permission_type,
    'ROLE_BASED' as grant_type,
    urr.status as user_role_status,
    rrr.status as role_resource_status,
    rrr.created_at as role_granted_at
FROM user_role_relations urr
JOIN role_resource_relations rrr ON urr.role_id = rrr.role_id
JOIN users u ON urr.user_id = u.user_id
JOIN user_resources ur ON rrr.resource_id = ur.resource_id
WHERE urr.status = 'ACTIVE'
  AND rrr.status = 1
  AND ur.status = 1
  AND ur.deleted_at IS NULL
  AND (urr.expires_at IS NULL OR urr.expires_at > NOW());

-- 用户完整权限视图(直接权限 + 角色权限)
CREATE VIEW `user_complete_permissions_view` AS
SELECT * FROM user_direct_permissions_view
UNION
SELECT 
    user_id,
    username,
    resource_id,
    resource_name,
    resource_code,
    resource_category,
    resource_path,
    permission_type,
    grant_type,
    1 as is_active,  -- 角色权限默认激活
    NULL as expires_at,
    role_granted_at as granted_at,
    NULL as granted_by,
    NULL as grant_reason
FROM user_role_permissions_view;

-- 资源统计视图
CREATE VIEW `resource_statistics_view` AS
SELECT 
    ur.resource_id,
    ur.resource_name,
    ur.resource_code,
    ur.resource_category,
    COUNT(DISTINCT urr.user_id) as direct_user_count,
    COUNT(DISTINCT rrr.role_id) as role_count,
    COUNT(DISTINCT urr2.user_id) as indirect_user_count,
    MIN(ur.created_at) as created_at,
    MAX(ur.updated_at) as updated_at
FROM user_resources ur
LEFT JOIN user_resource_relations urr ON ur.resource_id = urr.resource_id AND urr.is_active = 1
LEFT JOIN role_resource_relations rrr ON ur.resource_id = rrr.resource_id AND rrr.status = 1
LEFT JOIN user_role_relations urr2 ON rrr.role_id = urr2.role_id AND urr2.status = 'ACTIVE'
WHERE ur.status = 1 AND ur.deleted_at IS NULL
GROUP BY ur.resource_id, ur.resource_name, ur.resource_code, ur.resource_category;

-- 菜单树视图(用于前端导航)
CREATE VIEW `menu_tree_view` AS
SELECT 
    ur.resource_id,
    ur.resource_name,
    ur.resource_code,
    ur.resource_description,
    ur.resource_category,
    ur.resource_path,
    ur.resource_component,
    ur.resource_icon,
    ur.parent_id,
    ur.level,
    ur.sort_order,
    ur.visible,
    ur.external_link,
    ur.target,
    ur.badge,
    ur.badge_type,
    ur.meta_json,
    CASE 
        WHEN ur.parent_id IS NULL THEN '0'
        ELSE CONCAT(ur.parent_id, '-', ur.resource_id)
    END as tree_path,
    CASE 
        WHEN ur.parent_id IS NULL THEN ur.resource_name
        ELSE CONCAT(pur.resource_name, ' / ', ur.resource_name)
    END as full_name
FROM user_resources ur
LEFT JOIN user_resources pur ON ur.parent_id = pur.resource_id
WHERE ur.resource_category IN ('CATALOG', 'MENU', 'PAGE')
  AND ur.status = 1 
  AND ur.visible = 1
  AND ur.deleted_at IS NULL
ORDER BY ur.level, ur.parent_id, ur.sort_order;

-- ============================================
-- VIP体系相关视图
-- ============================================

-- 用户VIP详情视图
CREATE VIEW `user_vip_detail_view` AS
SELECT 
    u.user_id,
    u.username,
    un.display_name,
    up.nickname,
    vi.vip_level,
    vlc.level_name,
    vlc.icon_url,
    vlc.badge_color,
    vi.vip_points,
    vi.total_earned_points,
    vi.points_today,
    vi.points_this_month,
    vi.next_level_required,
    vi.vip_status,
    vi.vip_expire_date,
    vi.level_expire_date,
    JSON_EXTRACT(vlc.benefits_json, '$.discount') as discount_rate,
    vi.total_recharge_amount,
    vi.last_recharge_date,
    DATEDIFF(vi.vip_expire_date, CURDATE()) as days_until_expire
FROM users u
LEFT JOIN user_names un ON u.user_id = un.user_id
LEFT JOIN user_profiles up ON u.user_id = up.user_id
LEFT JOIN user_vip_info vi ON u.user_id = vi.user_id
LEFT JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level;

-- 用户升级进度视图
CREATE VIEW `user_upgrade_progress_view` AS
SELECT 
    u.user_id,
    u.username,
    vi.vip_level,
    vlc.level_name,
    vi.vip_points,
    -- 当前等级所需成长值
    vlc.min_points as current_level_min,
    vlc.max_points as current_level_max,
    -- 下一等级信息
    next_level.vip_level as next_vip_level,
    next_level.level_name as next_level_name,
    next_level.min_points as next_level_min,
    -- 升级进度计算
    CASE 
        WHEN vlc.max_points IS NULL THEN 100  -- 最高等级
        ELSE ROUND((vi.vip_points - vlc.min_points) * 100.0 / (vlc.max_points - vlc.min_points), 2)
    END as upgrade_progress_percent,
    -- 距离下一级还需成长值
    CASE 
        WHEN vlc.max_points IS NULL THEN 0
        ELSE GREATEST(0, next_level.min_points - vi.vip_points)
    END as points_needed_next_level,
    -- 升级预估
    CASE 
        WHEN vlc.max_points IS NULL THEN '最高等级'
        WHEN vi.points_today > 0 THEN 
            CONCAT('按今日速度还需', 
                   CEIL(GREATEST(0, next_level.min_points - vi.vip_points) / vi.points_today), 
                   '天')
        ELSE '暂无数据'
    END as upgrade_estimate
FROM users u
JOIN user_vip_info vi ON u.user_id = vi.user_id
JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level
LEFT JOIN vip_level_config next_level ON next_level.vip_level = vi.vip_level + 1;

-- VIP等级分布统计视图
CREATE VIEW `vip_level_distribution_view` AS
SELECT 
    vi.vip_level,
    vlc.level_name,
    COUNT(*) as user_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_vip_info), 2) as percentage,
    AVG(vi.vip_points) as avg_points,
    MIN(vi.vip_points) as min_points,
    MAX(vi.vip_points) as max_points,
    SUM(vi.total_recharge_amount) as total_recharge_amount
FROM user_vip_info vi
LEFT JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level
GROUP BY vi.vip_level, vlc.level_name
ORDER BY vi.vip_level DESC;

-- ============================================
-- 用户反馈相关视图
-- ============================================

-- 用户反馈详情视图
CREATE VIEW `user_feedback_detail_view` AS
SELECT 
    f.id,
    f.user_id,
    u.username,
    un.display_name,
    up.nickname,
    f.type,
    CASE f.type
        WHEN 1 THEN '系统问题'
        WHEN 2 THEN '功能建议'
        WHEN 3 THEN 'BUG反馈'
        WHEN 4 THEN '其他'
        ELSE '未知类型'
    END as type_name,
    f.content,
    f.contact_info,
    f.status,
    CASE f.status
        WHEN 1 THEN '待处理'
        WHEN 2 THEN '已受理'
        WHEN 3 THEN '已解决'
        WHEN 4 THEN '已关闭'
        ELSE '未知状态'
    END as status_name,
    f.reply,
    f.created_at,
    f.updated_at,
    -- 附加用户信息
    u.account_status,
    vi.vip_level,
    -- 最近登录信息
    ull.last_login_ip,
    ull.last_login_time
FROM user_feedback f
LEFT JOIN users u ON f.user_id = u.user_id
LEFT JOIN user_names un ON f.user_id = un.user_id
LEFT JOIN user_profiles up ON f.user_id = up.user_id
LEFT JOIN user_vip_info vi ON f.user_id = vi.user_id
LEFT JOIN user_last_login_view ull ON f.user_id = ull.user_id;

-- 用户反馈统计视图(按类型)
CREATE VIEW `user_feedback_stats_by_type_view` AS
SELECT 
    type,
    CASE type
        WHEN 1 THEN '系统问题'
        WHEN 2 THEN '功能建议'
        WHEN 3 THEN 'BUG反馈'
        WHEN 4 THEN '其他'
        ELSE '未知类型'
    END as type_name,
    COUNT(*) as total_count,
    COUNT(CASE WHEN status = 1 THEN 1 END) as pending_count,
    COUNT(CASE WHEN status = 2 THEN 1 END) as processing_count,
    COUNT(CASE WHEN status = 3 THEN 1 END) as resolved_count,
--     COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count,
--     ROUND(AVG(LENGTH(content))) as avg_content_length,
--     MIN(created_at) as first_feedback_date,
--     MAX(created_at) as last_feedback_date
	COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count
FROM user_feedback
GROUP BY type
ORDER BY type;

-- 用户反馈统计视图(按状态)
CREATE VIEW `user_feedback_stats_by_status_view` AS
SELECT 
    status,
    CASE status
        WHEN 1 THEN '待处理'
        WHEN 2 THEN '已受理'
        WHEN 3 THEN '已解决'
        WHEN 4 THEN '已关闭'
        ELSE '未知状态'
    END as status_name,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM user_feedback), 2) as percentage,
    AVG(TIMESTAMPDIFF(HOUR, created_at, IFNULL(updated_at, NOW()))) as avg_processing_hours
FROM user_feedback
GROUP BY status
ORDER BY status;

-- 用户反馈统计视图(按用户)
CREATE VIEW `user_feedback_stats_by_user_view` AS
SELECT 
    f.user_id,
    u.username,
    un.display_name,
    COUNT(*) as feedback_count,
    COUNT(CASE WHEN f.status = 3 THEN 1 END) as resolved_count,
    COUNT(CASE WHEN f.status = 1 THEN 1 END) as pending_count,
    MIN(f.created_at) as first_feedback_date,
    MAX(f.created_at) as last_feedback_date,
    ROUND(AVG(LENGTH(f.content))) as avg_content_length,
    -- 用户附加信息
    vi.vip_level,
    up2.total_points,
    DATEDIFF(NOW(), u.created_at) as days_since_registration
FROM user_feedback f
LEFT JOIN users u ON f.user_id = u.user_id
LEFT JOIN user_names un ON f.user_id = un.user_id
LEFT JOIN user_vip_info vi ON f.user_id = vi.user_id
LEFT JOIN user_points up2 ON f.user_id = up2.user_id
GROUP BY f.user_id, u.username, un.display_name, vi.vip_level, up2.total_points, u.created_at
ORDER BY feedback_count DESC;

-- 用户反馈统计视图(按月)
CREATE VIEW `user_feedback_stats_monthly_view` AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as total_feedback,
    COUNT(CASE WHEN status = 1 THEN 1 END) as pending_count,
    COUNT(CASE WHEN status = 2 THEN 1 END) as processing_count,
    COUNT(CASE WHEN status = 3 THEN 1 END) as resolved_count,
    COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count,
    COUNT(DISTINCT user_id) as unique_users,
    ROUND(AVG(LENGTH(content))) as avg_content_length,
    ROUND(AVG(CASE WHEN status = 3 THEN TIMESTAMPDIFF(HOUR, created_at, updated_at) END), 1) as avg_resolution_hours
FROM user_feedback
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month DESC;

-- 待处理反馈提醒视图
CREATE VIEW `pending_feedback_reminder_view` AS
SELECT 
    f.id,
    f.user_id,
    u.username,
    un.display_name,
    f.type,
    CASE f.type
        WHEN 1 THEN '系统问题'
        WHEN 2 THEN '功能建议'
        WHEN 3 THEN 'BUG反馈'
        WHEN 4 THEN '其他'
        ELSE '未知类型'
    END as type_name,
    LEFT(f.content, 100) as content_preview,
    f.contact_info,
    f.created_at,
    TIMESTAMPDIFF(HOUR, f.created_at, NOW()) as hours_pending,
    CASE 
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 72 THEN '紧急'
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 48 THEN '高'
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 24 THEN '中'
        ELSE '低'
    END as priority,
    -- 用户VIP等级
    vi.vip_level,
    vlc.level_name,
    -- 用户活跃度
    ul.total_logins,
    ul.last_login_time
FROM user_feedback f
LEFT JOIN users u ON f.user_id = u.user_id
LEFT JOIN user_names un ON f.user_id = un.user_id
LEFT JOIN user_vip_info vi ON f.user_id = vi.user_id
LEFT JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level
LEFT JOIN user_login_statistics_view ul ON f.user_id = ul.user_id
WHERE f.status = 1
ORDER BY 
    CASE 
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 72 THEN 1
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 48 THEN 2
        WHEN TIMESTAMPDIFF(HOUR, f.created_at, NOW()) > 24 THEN 3
        ELSE 4
    END,
    vi.vip_level DESC,
    f.created_at;












-- ============================================
-- 触发器
-- ============================================

DELIMITER $$

-- 自动更新父级资源层级

-- DROP TRIGGER IF EXISTS `trg_before_insert_user_resources`;
-- DROP TRIGGER IF EXISTS `trg_before_update_user_resources`;
-- DROP TRIGGER IF EXISTS `trg_after_update_user_resources_cascade`;
-- 插入资源时自动计算层级
CREATE TRIGGER `trg_before_insert_user_resources`
BEFORE INSERT ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE parent_level INT;
    
    IF NEW.parent_id IS NOT NULL THEN
        -- 获取父级层级
        SELECT COALESCE(level, 0) INTO parent_level 
        FROM user_resources 
        WHERE resource_id = NEW.parent_id;
        
        -- 设置新资源的层级
        SET NEW.level = parent_level + 1;
    ELSE
        SET NEW.level = 1;
    END IF;
    
    -- 如果没有提供创建人, 默认为系统用户(如果有)
    IF NEW.create_by IS NULL THEN
        -- 可以设置为0或NULL, 或者从session中获取当前用户ID
        SET NEW.create_by = NULL;
    END IF;
    
    -- 如果没有提供更新人, 默认为创建人
    IF NEW.update_by IS NULL THEN
        SET NEW.update_by = NEW.create_by;
    END IF;
END$$

-- 更新资源时自动计算层级(当父级改变时)
CREATE TRIGGER `trg_before_update_user_resources`
BEFORE UPDATE ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE parent_level INT;
    DECLARE original_parent_id INT;
    DECLARE original_level INT;
    
    -- 保存原始值用于比较
    SET original_parent_id = OLD.parent_id;
    SET original_level = OLD.level;
    
    -- 只有当父级ID改变时才重新计算层级
    IF (NEW.parent_id IS NULL AND original_parent_id IS NOT NULL) OR 
       (NEW.parent_id IS NOT NULL AND original_parent_id IS NULL) OR
       (NEW.parent_id != original_parent_id) THEN
        
        IF NEW.parent_id IS NOT NULL THEN
            -- 获取新父级的层级
            SELECT COALESCE(level, 0) INTO parent_level 
            FROM user_resources 
            WHERE resource_id = NEW.parent_id;
            
            -- 设置新层级
            SET NEW.level = parent_level + 1;
        ELSE
            SET NEW.level = 1;
        END IF;
        
        -- 设置更新人(如果提供了新的更新人, 则使用它)
        -- 如果没有提供更新人, 则保持不变
        IF NEW.update_by IS NULL THEN
            SET NEW.update_by = OLD.update_by;
        END IF;
    END IF;
END$$

-- 更新资源层级后, 级联更新所有子资源的层级
CREATE TRIGGER `trg_after_update_user_resources_cascade`
AFTER UPDATE ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE level_diff INT;
    
    -- 只有当层级发生变化时, 才需要级联更新子资源
    IF NEW.level != OLD.level THEN
        -- 计算层级差
        SET level_diff = NEW.level - OLD.level;
        
        -- 级联更新所有子资源的层级
        
        -- 创建临时表存储所有后代资源ID
        DROP TEMPORARY TABLE IF EXISTS temp_descendants;
        CREATE TEMPORARY TABLE temp_descendants (
            resource_id INT,
            current_level INT
        );
        
        -- 插入直接子节点
        INSERT INTO temp_descendants (resource_id, current_level)
        SELECT resource_id, level
        FROM user_resources 
        WHERE parent_id = NEW.resource_id;
        
        -- 循环处理更深层级的子节点
        WHILE ROW_COUNT() > 0 DO
            INSERT INTO temp_descendants (resource_id, current_level)
            SELECT ur.resource_id, ur.level
            FROM user_resources ur
            JOIN temp_descendants td ON ur.parent_id = td.resource_id
            WHERE NOT EXISTS (
                SELECT 1 FROM temp_descendants WHERE resource_id = ur.resource_id
            );
        END WHILE;
        
        -- 更新所有后代资源的层级
        UPDATE user_resources ur
        JOIN temp_descendants td ON ur.resource_id = td.resource_id
        SET ur.level = td.current_level + level_diff,
            ur.updated_at = NOW(),
            ur.update_by = NEW.update_by
        WHERE ur.resource_id IN (SELECT resource_id FROM temp_descendants);
        
        -- 清理临时表
        DROP TEMPORARY TABLE IF EXISTS temp_descendants;
    END IF;
END$$

-- 检查并防止循环引用的触发器
CREATE TRIGGER `trg_before_insert_user_resources_no_cycle`
BEFORE INSERT ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE is_cyclic TINYINT DEFAULT 0;
    
    IF NEW.parent_id IS NOT NULL THEN
        -- 检查是否形成循环引用(新资源的父级不能是它自己)
        IF NEW.parent_id = NEW.resource_id THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = '资源不能将自身设置为父级';
        END IF;
        
        -- 检查更深层次的循环引用
        SET is_cyclic = fn_check_resource_cycle(NEW.resource_id, NEW.parent_id);
        
        IF is_cyclic = 1 THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = '检测到循环引用: 资源不能是自己的后代';
        END IF;
    END IF;
END$$

-- 更新时检查循环引用
CREATE TRIGGER `trg_before_update_user_resources_no_cycle`
BEFORE UPDATE ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE is_cyclic TINYINT DEFAULT 0;
    
    -- 只有当父级改变时才需要检查
    IF (NEW.parent_id IS NULL AND OLD.parent_id IS NOT NULL) OR 
       (NEW.parent_id IS NOT NULL AND OLD.parent_id IS NULL) OR
       (NEW.parent_id != OLD.parent_id) THEN
        
        IF NEW.parent_id IS NOT NULL THEN
            -- 检查是否形成循环引用
            IF NEW.parent_id = NEW.resource_id THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = '资源不能将自身设置为父级';
            END IF;
            
            -- 检查更深层次的循环引用
            SET is_cyclic = fn_check_resource_cycle(NEW.resource_id, NEW.parent_id);
            
            IF is_cyclic = 1 THEN
                SIGNAL SQLSTATE '45000' 
                SET MESSAGE_TEXT = '检测到循环引用: 资源不能是自己的后代';
            END IF;
        END IF;
    END IF;
END$$

-- 创建检查资源循环引用的函数
CREATE FUNCTION `fn_check_resource_cycle`(
    p_resource_id INT,
    p_parent_id INT
) RETURNS TINYINT READS SQL DATA
BEGIN
    DECLARE v_current_id INT;
    DECLARE v_parent_of_current INT;
    DECLARE v_loop_counter INT DEFAULT 0;
    
    -- 如果父级ID为空, 则没有循环
    IF p_parent_id IS NULL THEN
        RETURN 0;
    END IF;
    
    -- 如果资源ID等于父级ID, 则是直接循环
    IF p_resource_id = p_parent_id THEN
        RETURN 1;
    END IF;
    
    -- 从父级开始向上遍历, 检查是否会出现资源ID
    SET v_current_id = p_parent_id;
    
    WHILE v_current_id IS NOT NULL AND v_loop_counter < 100 DO
        -- 获取当前节点的父级
        SELECT parent_id INTO v_parent_of_current
        FROM user_resources 
        WHERE resource_id = v_current_id;
        
        -- 如果找到了资源ID, 说明有循环
        IF v_parent_of_current = p_resource_id THEN
            RETURN 1;
        END IF;
        
        -- 移动到上一级
        SET v_current_id = v_parent_of_current;
        SET v_loop_counter = v_loop_counter + 1;
    END WHILE;
    
    -- 如果循环计数器达到上限, 可能是有深层循环, 但为了安全返回0
    IF v_loop_counter >= 100 THEN
        RETURN 0; -- 或者可以返回错误, 这里为了安全返回0
    END IF;
    
    RETURN 0;
END$$

-- 安全地移动资源(包括所有子节点)
CREATE PROCEDURE `sp_move_resource`(
    IN p_resource_id INT,
    IN p_new_parent_id INT,
    IN p_operator_id INT
)
BEGIN
    DECLARE v_old_parent_id INT;
    DECLARE v_old_level INT;
    DECLARE v_new_parent_level INT;
    DECLARE v_is_cyclic TINYINT;
    
    -- 获取原始信息
    SELECT parent_id, level INTO v_old_parent_id, v_old_level
    FROM user_resources 
    WHERE resource_id = p_resource_id;
    
    -- 检查循环引用
    SET v_is_cyclic = fn_check_resource_cycle(p_resource_id, p_new_parent_id);
    
    IF v_is_cyclic = 1 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '操作失败: 检测到循环引用';
    END IF;
    
    -- 开始事务
    START TRANSACTION;
    
    -- 更新资源的父级和层级
    IF p_new_parent_id IS NOT NULL THEN
        -- 获取新父级的层级
        SELECT COALESCE(level, 0) INTO v_new_parent_level 
        FROM user_resources 
        WHERE resource_id = p_new_parent_id;
        
        -- 更新资源
        UPDATE user_resources 
        SET 
            parent_id = p_new_parent_id,
            level = v_new_parent_level + 1,
            update_by = p_operator_id,
            updated_at = NOW()
        WHERE resource_id = p_resource_id;
    ELSE
        -- 移动到根节点
        UPDATE user_resources 
        SET 
            parent_id = NULL,
            level = 1,
            update_by = p_operator_id,
            updated_at = NOW()
        WHERE resource_id = p_resource_id;
    END IF;
    
    -- 级联更新所有子节点的层级
    CALL sp_cascade_update_resource_level(p_resource_id, p_operator_id);
    
    COMMIT;
    
    SELECT '资源移动成功' as result;
END$$

-- 级联更新资源层级
CREATE PROCEDURE `sp_cascade_update_resource_level`(
    IN p_root_resource_id INT,
    IN p_operator_id INT
)
BEGIN
    DECLARE v_done INT DEFAULT 0;
    DECLARE v_resource_id INT;
    DECLARE v_parent_id INT;
    DECLARE v_level INT;
    DECLARE cur CURSOR FOR 
        WITH RECURSIVE resource_tree AS (
            SELECT resource_id, parent_id, level
            FROM user_resources 
            WHERE resource_id = p_root_resource_id
            UNION ALL
            SELECT ur.resource_id, ur.parent_id, ur.level
            FROM user_resources ur
            INNER JOIN resource_tree rt ON ur.parent_id = rt.resource_id
        )
        SELECT resource_id, parent_id, level FROM resource_tree;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO v_resource_id, v_parent_id, v_level;
        IF v_done THEN
            LEAVE read_loop;
        END IF;
        
        -- 重新计算层级
        IF v_parent_id IS NOT NULL THEN
            SELECT COALESCE(level, 0) INTO v_level 
            FROM user_resources 
            WHERE resource_id = v_parent_id;
            
            UPDATE user_resources 
            SET level = v_level + 1,
                update_by = p_operator_id,
                updated_at = NOW()
            WHERE resource_id = v_resource_id;
        ELSE
            UPDATE user_resources 
            SET level = 1,
                update_by = p_operator_id,
                updated_at = NOW()
            WHERE resource_id = v_resource_id;
        END IF;
    END LOOP;
    
    CLOSE cur;
END$$

-- 简化的插入触发器
CREATE TRIGGER `trg_before_insert_user_resources_simple`
BEFORE INSERT ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE parent_level INT DEFAULT 0;
    
    IF NEW.parent_id IS NOT NULL THEN
        -- 获取父级层级, 确保只返回一行
        SELECT COALESCE(level, 0) INTO parent_level 
        FROM user_resources 
        WHERE resource_id = NEW.parent_id
        LIMIT 1;
        
        SET NEW.level = parent_level + 1;
    ELSE
        SET NEW.level = 1;
    END IF;
END$$

-- 简化的更新触发器
CREATE TRIGGER `trg_before_update_user_resources_simple`
BEFORE UPDATE ON `user_resources`
FOR EACH ROW
BEGIN
    DECLARE parent_level INT DEFAULT 0;
    
    -- 只有当父级改变时才重新计算层级
    IF (NEW.parent_id IS NULL AND OLD.parent_id IS NOT NULL) OR 
       (NEW.parent_id IS NOT NULL AND OLD.parent_id IS NULL) OR
       (NEW.parent_id != OLD.parent_id) THEN
        
        IF NEW.parent_id IS NOT NULL THEN
            -- 获取新父级的层级
            SELECT COALESCE(level, 0) INTO parent_level 
            FROM user_resources 
            WHERE resource_id = NEW.parent_id
            LIMIT 1;
            
            SET NEW.level = parent_level + 1;
        ELSE
            SET NEW.level = 1;
        END IF;
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- 当用户登录时自动记录登录信息

CREATE TRIGGER `trg_after_user_login_log`
AFTER INSERT ON `user_logs`
FOR EACH ROW
BEGIN
    -- 只有当操作是登录且状态成功时, 才记录到登录记录表
    IF NEW.action IN ('LOGIN', 'AUTO_LOGIN', 'TOKEN_LOGIN') AND NEW.status = 1 THEN
        INSERT INTO `user_login_records` 
        (user_id, ip_address, user_agent, device_info, login_type, login_status)
        VALUES 
        (NEW.user_id, NEW.ip_address, NEW.user_agent, NEW.device_info, 
         CASE NEW.action 
             WHEN 'AUTO_LOGIN' THEN 'AUTO_LOGIN'
             WHEN 'TOKEN_LOGIN' THEN 'TOKEN_REFRESH'
             ELSE 'LOGIN'
         END, 1);
    END IF;
END$$

-- -- 当用户积分变更时自动记录积分变更日志
-- CREATE TRIGGER `trg_after_user_points_update`
-- AFTER UPDATE ON `user_points`
-- FOR EACH ROW
-- BEGIN
--     -- 当总积分发生变化时记录日志
--     IF OLD.total_points <> NEW.total_points THEN
--         INSERT INTO `user_points_log` 
--         (user_id, points_change, points_type, current_total, current_available, description)
--         VALUES 
--         (NEW.user_id, 
--          NEW.total_points - OLD.total_points,
--          'OTHER', -- 根据实际业务逻辑确定类型
--          NEW.total_points,
--          NEW.available_points,
--          CONCAT('系统调整: 总积分变更 ', OLD.total_points, ' -> ', NEW.total_points)
--         );
--     END IF;
-- END$$
-- 
-- -- 当用户会员信息变更时自动记录日志
-- CREATE TRIGGER `trg_after_user_vip_info_update`
-- AFTER UPDATE ON `user_vip_info`
-- FOR EACH ROW
-- BEGIN
--     -- 当VIP等级或VIP成长值发生变化时记录日志
--     IF OLD.vip_level <> NEW.vip_level OR OLD.vip_points <> NEW.vip_points THEN
--         INSERT INTO `user_vip_log` 
--         (user_id, old_vip_level, new_vip_level, old_vip_points, new_vip_points, change_type, change_reason)
--         VALUES 
--         (NEW.user_id,
--          OLD.vip_level,
--          NEW.vip_level,
--          OLD.vip_points,
--          NEW.vip_points,
--          CASE 
--              WHEN NEW.vip_level > OLD.vip_level THEN 'UPGRADE'
--              WHEN NEW.vip_level < OLD.vip_level THEN 'DOWNGRADE'
--              ELSE 'POINTS_CHANGE'
--          END,
--          CONCAT('系统自动变更: VIP等级 ', OLD.vip_level, '->', NEW.vip_level, ', VIP成长值 ', OLD.vip_points, '->', NEW.vip_points)
--         );
--     END IF;
-- END$$

-- 当用户积分变更时自动记录积分变更日志
CREATE TRIGGER `trg_after_user_points_update`
AFTER UPDATE ON `user_points`
FOR EACH ROW
BEGIN
    DECLARE v_change_type VARCHAR(20);
    
    -- 确定变更类型
    IF NEW.total_points > OLD.total_points THEN
        SET v_change_type = 'INCREASE';
    ELSE
        SET v_change_type = 'DECREASE';
    END IF;
    
    -- 当总积分发生变化时记录日志
    IF OLD.total_points <> NEW.total_points THEN
        INSERT INTO `user_points_log` 
        (user_id, points_change, points_type, current_total, current_available, description)
        VALUES 
        (NEW.user_id, 
         NEW.total_points - OLD.total_points,
         v_change_type,
         NEW.total_points,
         NEW.available_points,
         CONCAT('系统调整: 总积分变更 ', OLD.total_points, ' -> ', NEW.total_points)
        );
    END IF;
END$$

-- 当用户会员信息变更时自动记录日志
CREATE TRIGGER `trg_after_user_vip_info_update`
AFTER UPDATE ON `user_vip_info`
FOR EACH ROW
BEGIN
    DECLARE v_change_desc VARCHAR(255);
    
    -- 当VIP等级或VIP成长值发生变化时记录日志
    IF OLD.vip_level <> NEW.vip_level OR OLD.vip_points <> NEW.vip_points THEN
        
        -- 构建变更描述
        SET v_change_desc = CONCAT(
            'VIP变更: ',
            '等级 ', OLD.vip_level, '->', NEW.vip_level,
            ', 成长值 ', OLD.vip_points, '->', NEW.vip_points
        );
        
        INSERT INTO `user_vip_log` 
        (user_id, old_vip_level, new_vip_level, old_vip_points, new_vip_points, change_type, change_reason)
        VALUES 
        (NEW.user_id,
         OLD.vip_level,
         NEW.vip_level,
         OLD.vip_points,
         NEW.vip_points,
         CASE 
             WHEN NEW.vip_level > OLD.vip_level THEN 'UPGRADE'
             WHEN NEW.vip_level < OLD.vip_level THEN 'DOWNGRADE'
             ELSE 'POINTS_CHANGE'
         END,
         v_change_desc
        );
    END IF;
END$$

DELIMITER ;

DELIMITER $$

-- 删除已存在的存储过程
-- DROP PROCEDURE IF EXISTS `sp_get_user_points_detail`;
-- DROP PROCEDURE IF EXISTS `sp_batch_adjust_user_points`;
-- DROP PROCEDURE IF EXISTS `sp_get_points_system_report`;

-- 获取用户积分详细统计
CREATE PROCEDURE `sp_get_user_points_detail`(
    IN p_user_id INT,
    IN p_days INT
)
BEGIN
    -- 如果没有传入 p_days, 则使用默认值 30
    IF p_days IS NULL THEN
        SET p_days = 30;
    END IF;
    
    -- 用户积分基本信息
    SELECT 
        u.user_id,
        u.username,
        un.display_name,
        up.nickname,
        p.total_points,
        p.available_points,
        p.frozen_points,
        p.consumed_points,
        ROUND(p.consumed_points * 100.0 / NULLIF(p.total_points + p.consumed_points, 0), 2) as consumption_rate
    FROM users u
    LEFT JOIN user_names un ON u.user_id = un.user_id
    LEFT JOIN user_profiles up ON u.user_id = up.user_id
    LEFT JOIN user_points p ON u.user_id = p.user_id
    WHERE u.user_id = p_user_id;
    
    -- 积分变更历史
    SELECT 
        log_id,
        points_change,
        points_type,
        description,
        current_total,
        current_available,
        operator_id,
        (SELECT username FROM users WHERE user_id = operator_id) as operator_name,
        created_at
    FROM user_points_log
    WHERE user_id = p_user_id
      AND created_at >= DATE_SUB(NOW(), INTERVAL p_days DAY)
    ORDER BY created_at DESC
    LIMIT 50;
    
    -- 积分统计
    SELECT 
        COUNT(*) as total_transactions,
        SUM(CASE WHEN points_change > 0 THEN points_change ELSE 0 END) as total_earned,
        SUM(CASE WHEN points_change < 0 THEN ABS(points_change) ELSE 0 END) as total_consumed,
        COUNT(DISTINCT points_type) as distinct_types
    FROM user_points_log
    WHERE user_id = p_user_id
      AND created_at >= DATE_SUB(NOW(), INTERVAL p_days DAY);
END$$

-- -- 批量调整用户积分(用于管理员批量操作)
-- CREATE PROCEDURE `sp_batch_adjust_user_points`(
--     IN p_user_ids TEXT,  -- 逗号分隔的用户ID列表, 如 '10001,10002,10003'
--     IN p_points_change INT,
--     IN p_points_type VARCHAR(20),
--     IN p_description VARCHAR(255),
--     IN p_operator_id INT
-- )
-- BEGIN
--     DECLARE v_current_user_id INT DEFAULT 0;
--     DECLARE v_success_count INT DEFAULT 0;
--     DECLARE v_fail_count INT DEFAULT 0;
--     DECLARE v_user_ids_temp TEXT;
--     DECLARE v_user_id_str VARCHAR(20);
--     DECLARE v_pos INT DEFAULT 1;
--     DECLARE v_points_type_enum VARCHAR(20);
--     
--     -- 将 points_type 转换为大写
--     SET v_points_type_enum = UPPER(p_points_type);
--     
--     -- 创建临时表存储结果 (使用 InnoDB 引擎, 支持 TEXT 列)
--     CREATE TEMPORARY TABLE IF NOT EXISTS batch_adjust_results (
--         user_id INT,
--         result VARCHAR(50),
--         message VARCHAR(500),  -- 将 TEXT 改为 VARCHAR(500)
--         new_total_points INT,
--         new_available_points INT
--     ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--     
--     -- 清空临时表
--     DELETE FROM batch_adjust_results;
--     
--     -- 验证输入
--     IF p_user_ids IS NULL OR TRIM(p_user_ids) = '' THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '用户ID列表不能为空';
--     END IF;
--     
--     IF p_points_change = 0 THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '积分变更值不能为0';
--     END IF;
--     
--     -- 验证 points_type (使用转换后的值)
--     IF v_points_type_enum NOT IN ('SIGN_IN', 'TASK', 'PURCHASE', 'CONSUME', 'ADMIN_ADJUST', 'REFUND', 'OTHER') THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '无效的积分类型';
--     END IF;
--     
--     -- 开始事务
--     START TRANSACTION;
--     
--     -- 设置初始值
--     SET v_user_ids_temp = p_user_ids;
--     
--     -- 使用标签来标记循环
--     user_ids_loop: WHILE LENGTH(v_user_ids_temp) > 0 DO
--         -- 查找逗号位置
--         SET v_pos = LOCATE(',', v_user_ids_temp);
--         
--         IF v_pos > 0 THEN
--             -- 提取用户ID
--             SET v_user_id_str = TRIM(SUBSTRING(v_user_ids_temp, 1, v_pos - 1));
--             SET v_user_ids_temp = TRIM(SUBSTRING(v_user_ids_temp, v_pos + 1));
--         ELSE
--             -- 最后一个用户ID
--             SET v_user_id_str = TRIM(v_user_ids_temp);
--             SET v_user_ids_temp = '';
--         END IF;
--         
--         -- 转换为整数(跳过空字符串)
--         IF v_user_id_str != '' THEN
--             SET v_current_user_id = CAST(v_user_id_str AS UNSIGNED);
--             
--             -- 验证用户是否存在
--             IF EXISTS (SELECT 1 FROM users WHERE user_id = v_current_user_id) THEN
--                 BEGIN
--                     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--                     BEGIN
--                         -- 记录失败
--                         INSERT INTO batch_adjust_results 
--                         VALUES (v_current_user_id, '失败', '调整积分时发生错误', NULL, NULL);
--                         SET v_fail_count = v_fail_count + 1;
--                     END;
--                     
--                     -- 调用单个调整存储过程 (传递转换后的 points_type)
--                     CALL sp_adjust_user_points(v_current_user_id, p_points_change, v_points_type_enum, p_description, p_operator_id);
--                     
--                     -- 记录成功
--                     INSERT INTO batch_adjust_results 
--                     VALUES (v_current_user_id, '成功', '积分调整成功', 
--                            (SELECT total_points FROM user_points WHERE user_id = v_current_user_id),
--                            (SELECT available_points FROM user_points WHERE user_id = v_current_user_id));
--                     
--                     SET v_success_count = v_success_count + 1;
--                 END;
--             ELSE
--                 -- 用户不存在, 记录失败
--                 INSERT INTO batch_adjust_results 
--                 VALUES (v_current_user_id, '失败', '用户不存在', NULL, NULL);
--                 SET v_fail_count = v_fail_count + 1;
--             END IF;
--         END IF;
--     END WHILE user_ids_loop;
--     
--     COMMIT;
--     
--     -- 返回结果
--     SELECT 
--         '批量调整完成' as result,
--         v_success_count as success_count,
--         v_fail_count as fail_count,
--         v_success_count + v_fail_count as total_count;
--     
--     -- 显示详细结果
--     SELECT * FROM batch_adjust_results ORDER BY user_id;
--     
--     -- 清理临时表
--     DROP TEMPORARY TABLE IF EXISTS batch_adjust_results;
-- END$$

-- 获取系统积分统计报告
CREATE PROCEDURE `sp_get_points_system_report`(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- 总体统计
    SELECT 
        '积分系统总体统计' as report_section,
        COUNT(DISTINCT user_id) as total_users_with_points,
        SUM(total_points) as total_points_in_system,
        SUM(available_points) as total_available_points,
        SUM(frozen_points) as total_frozen_points,
        SUM(consumed_points) as total_consumed_points,
        ROUND(AVG(total_points), 2) as avg_points_per_user,
        MAX(total_points) as max_points,
        MIN(total_points) as min_points
    FROM user_points;
    
    -- 积分变动统计(按类型)
    SELECT 
        '积分变动类型统计' as report_section,
        points_type,
        COUNT(*) as transaction_count,
        SUM(points_change) as total_points_change,
        SUM(CASE WHEN points_change > 0 THEN points_change ELSE 0 END) as total_earned,
        SUM(CASE WHEN points_change < 0 THEN ABS(points_change) ELSE 0 END) as total_consumed,
        COUNT(DISTINCT user_id) as affected_users,
        ROUND(AVG(points_change), 2) as avg_points_change
    FROM user_points_log
    WHERE (p_start_date IS NULL OR DATE(created_at) >= p_start_date)
      AND (p_end_date IS NULL OR DATE(created_at) <= p_end_date)
    GROUP BY points_type
    ORDER BY total_points_change DESC;
    
    -- 积分变动趋势(按日)
    SELECT 
        '积分变动趋势(按日)' as report_section,
        DATE(created_at) as date,
        COUNT(*) as daily_transactions,
        SUM(points_change) as daily_net_change,
        SUM(CASE WHEN points_change > 0 THEN points_change ELSE 0 END) as daily_earned,
        SUM(CASE WHEN points_change < 0 THEN ABS(points_change) ELSE 0 END) as daily_consumed,
        COUNT(DISTINCT user_id) as daily_active_users
    FROM user_points_log
    WHERE (p_start_date IS NULL OR DATE(created_at) >= p_start_date)
      AND (p_end_date IS NULL OR DATE(created_at) <= p_end_date)
    GROUP BY DATE(created_at)
    ORDER BY date DESC
    LIMIT 30;
    
    -- 最活跃用户(积分变动次数最多)
    SELECT 
        '最活跃用户(积分变动)' as report_section,
        upl.user_id,
        u.username,
        un.display_name,
        COUNT(*) as transaction_count,
        SUM(upl.points_change) as total_points_change,
        MAX(upl.created_at) as last_transaction_time
    FROM user_points_log upl
    JOIN users u ON upl.user_id = u.user_id
    LEFT JOIN user_names un ON u.user_id = un.user_id
    WHERE (p_start_date IS NULL OR DATE(upl.created_at) >= p_start_date)
      AND (p_end_date IS NULL OR DATE(upl.created_at) <= p_end_date)
    GROUP BY upl.user_id, u.username, un.display_name
    ORDER BY transaction_count DESC
    LIMIT 10;
END$$

DELIMITER ;

DELIMITER $$

-- 简化版的获取用户积分详情
CREATE PROCEDURE `sp_get_user_points_simple`(
    IN p_user_id INT
)
BEGIN
    -- 用户积分基本信息
    SELECT 
        u.user_id,
        u.username,
        un.display_name,
        up.nickname,
        p.total_points,
        p.available_points,
        p.frozen_points,
        p.consumed_points,
        ROUND(p.consumed_points * 100.0 / NULLIF(p.total_points + p.consumed_points, 0), 2) as consumption_rate
    FROM users u
    LEFT JOIN user_names un ON u.user_id = un.user_id
    LEFT JOIN user_profiles up ON u.user_id = up.user_id
    LEFT JOIN user_points p ON u.user_id = p.user_id
    WHERE u.user_id = p_user_id;
END$$

-- 简化版的获取用户积分历史
CREATE PROCEDURE `sp_get_user_points_history`(
    IN p_user_id INT,
    IN p_limit INT
)
BEGIN
    -- 积分变更历史
    SELECT 
        log_id,
        points_change,
        points_type,
        description,
        current_total,
        current_available,
        operator_id,
        (SELECT username FROM users WHERE user_id = operator_id) as operator_name,
        created_at
    FROM user_points_log
    WHERE user_id = p_user_id
    ORDER BY created_at DESC
    LIMIT p_limit;
END$$

DELIMITER ;











-- ============================================
-- VIP体系存储过程
-- ============================================

DELIMITER $$

-- 更新用户VIP等级(根据成长值)
CREATE PROCEDURE `sp_update_user_vip_level`(
    IN p_user_id INT
)
BEGIN
    DECLARE v_current_points INT;
    DECLARE v_new_level TINYINT;
    DECLARE v_old_level TINYINT;
    DECLARE v_next_level_min INT;
    
    -- 获取当前成长值
    SELECT vip_points, vip_level INTO v_current_points, v_old_level
    FROM user_vip_info WHERE user_id = p_user_id;
    
    -- 根据成长值确定新等级
    SELECT vip_level INTO v_new_level
    FROM vip_level_config 
    WHERE v_current_points >= min_points 
      AND (max_points IS NULL OR v_current_points < max_points)
    ORDER BY vip_level DESC
    LIMIT 1;
    
    -- 获取下一级所需成长值
    SELECT min_points INTO v_next_level_min
    FROM vip_level_config 
    WHERE vip_level = v_new_level + 1;
    
    -- 更新用户VIP信息
    UPDATE user_vip_info 
    SET 
        vip_level = v_new_level,
        next_level_required = CASE 
            WHEN v_next_level_min IS NOT NULL THEN v_next_level_min
            ELSE NULL
        END,
        vip_upgrade_date = CASE 
            WHEN v_new_level > v_old_level THEN NOW()
            ELSE vip_upgrade_date
        END,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- 如果等级发生变化, 记录日志
    IF v_old_level != v_new_level THEN
        INSERT INTO user_vip_log 
        (user_id, old_vip_level, new_vip_level, old_vip_points, new_vip_points, change_type, change_reason)
        SELECT 
            p_user_id,
            v_old_level,
            v_new_level,
            v_current_points,
            v_current_points,
            CASE 
                WHEN v_new_level > v_old_level THEN 'UPGRADE'
                ELSE 'DOWNGRADE'
            END,
            CONCAT('成长值达到', v_current_points, ', 自动升级')
        FROM dual;
    END IF;
END$$

-- 添加成长值
CREATE PROCEDURE `sp_add_vip_points`(
    IN p_user_id INT,
    IN p_rule_code VARCHAR(50),
    IN p_points INT,
    IN p_reference_id VARCHAR(100),
    IN p_reference_type VARCHAR(50)
)
BEGIN
    DECLARE v_rule_id INT;
    DECLARE v_points_value INT;
    DECLARE v_points_type VARCHAR(20);
    DECLARE v_max_daily INT;
    DECLARE v_max_total INT;
    DECLARE v_require_level TINYINT;
    DECLARE v_cooldown INT;
    DECLARE v_daily_count INT;
    DECLARE v_total_count INT;
    DECLARE v_last_time DATETIME;
    DECLARE v_user_level TINYINT;
    DECLARE v_points_today INT;
    DECLARE v_points_month INT;
    DECLARE v_daily_limit INT;
    DECLARE v_monthly_limit INT;
    DECLARE v_today_date DATE;
    DECLARE v_month_start DATE;
    DECLARE v_final_points INT;
    
    -- 获取规则信息
    SELECT rule_id, points_value, points_type, max_times_per_day, max_times_total, 
           require_vip_level, cooldown_seconds
    INTO v_rule_id, v_points_value, v_points_type, v_max_daily, v_max_total, 
         v_require_level, v_cooldown
    FROM vip_points_rules 
    WHERE rule_code = p_rule_code AND status = 1;
    
    IF v_rule_id IS NULL THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '规则不存在或已禁用';
    END IF;
    
    -- 获取用户当前等级
    SELECT vip_level INTO v_user_level FROM user_vip_info WHERE user_id = p_user_id;
    
    -- 检查等级要求
    IF v_user_level < v_require_level THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '用户等级不符合规则要求';
--         SET MESSAGE_TEXT = CONCAT('用户等级不符合规则要求, 需要VIP', v_require_level, '以上');
    END IF;
    
    -- 检查每日次数限制
    IF v_max_daily IS NOT NULL THEN
        SELECT COUNT(*) INTO v_daily_count
        FROM user_vip_points_log 
        WHERE user_id = p_user_id 
          AND rule_id = v_rule_id 
          AND DATE(created_at) = CURDATE();
        
        IF v_daily_count >= v_max_daily THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = '今日已达到该规则最大次数限制';
--             SET MESSAGE_TEXT = CONCAT('今日已达到该规则最大次数限制(', v_max_daily, '次)');
        END IF;
    END IF;
    
    -- 检查总次数限制
    IF v_max_total IS NOT NULL THEN
        SELECT COUNT(*) INTO v_total_count
        FROM user_vip_points_log 
        WHERE user_id = p_user_id 
          AND rule_id = v_rule_id;
        
        IF v_total_count >= v_max_total THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = '已达到该规则总次数限制';
--             SET MESSAGE_TEXT = CONCAT('已达到该规则总次数限制(', v_max_total, '次)');
        END IF;
    END IF;
    
    -- 检查冷却时间
    IF v_cooldown > 0 THEN
        SELECT MAX(created_at) INTO v_last_time
        FROM user_vip_points_log 
        WHERE user_id = p_user_id 
          AND rule_id = v_rule_id;
        
        IF v_last_time IS NOT NULL AND TIMESTAMPDIFF(SECOND, v_last_time, NOW()) < v_cooldown THEN
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = '操作过于频繁, 请稍后再试';
--             SET MESSAGE_TEXT = CONCAT('操作过于频繁, 请', v_cooldown - TIMESTAMPDIFF(SECOND, v_last_time, NOW()), '秒后再试');
        END IF;
    END IF;
    
    -- 获取用户今日和本月已获得成长值
    SET v_today_date = CURDATE();
    SET v_month_start = DATE_SUB(CURDATE(), INTERVAL DAY(CURDATE()) - 1 DAY);
    
    SELECT points_today, points_this_month INTO v_points_today, v_points_month
    FROM user_vip_info 
    WHERE user_id = p_user_id;
    
    -- 获取等级对应的每日和每月上限
    SELECT daily_points_limit, monthly_points_limit INTO v_daily_limit, v_monthly_limit
    FROM vip_level_config 
    WHERE vip_level = v_user_level;
    
    -- 计算实际可获得的成长值
    SET v_final_points = LEAST(
        v_points_value,
        v_daily_limit - v_points_today,
        v_monthly_limit - v_points_month
    );
    
    IF v_final_points <= 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '已达到今日或本月成长值上限';
    END IF;
    
    -- 开始事务
    START TRANSACTION;
    
    -- 更新用户VIP信息
    UPDATE user_vip_info 
    SET 
        vip_points = vip_points + v_final_points,
        total_earned_points = total_earned_points + v_final_points,
        points_today = points_today + v_final_points,
        points_this_month = points_this_month + v_final_points,
        last_points_date = CURDATE(),
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- 记录成长值获取日志
    INSERT INTO user_vip_points_log 
    (user_id, rule_id, rule_code, points_earned, current_vip_points, current_vip_level, reference_id, reference_type)
    SELECT 
        p_user_id,
        v_rule_id,
        p_rule_code,
        v_final_points,
        vip_points,
        vip_level,
        p_reference_id,
        p_reference_type
    FROM user_vip_info 
    WHERE user_id = p_user_id;
    
    -- 更新VIP等级
    CALL sp_update_user_vip_level(p_user_id);
    
    COMMIT;
    
    -- 返回添加的成长值
    SELECT v_final_points as points_added;
END$$

-- 重置每日/每月成长值计数
CREATE PROCEDURE `sp_reset_daily_points`()
BEGIN
    DECLARE v_today DATE;
    DECLARE v_month_start DATE;
    
    SET v_today = CURDATE();
    SET v_month_start = DATE_SUB(v_today, INTERVAL DAY(v_today) - 1 DAY);
    
    -- 重置每日计数(只对昨天有记录的用户)
    UPDATE user_vip_info 
    SET points_today = 0
    WHERE last_points_date IS NOT NULL 
      AND last_points_date < v_today;
    
    -- 重置每月计数(新月份开始时)
    IF DAY(v_today) = 1 THEN
        UPDATE user_vip_info 
        SET points_this_month = 0
        WHERE last_points_date < v_month_start;
    END IF;
END$$

-- 检查并处理VIP到期
CREATE PROCEDURE `sp_check_vip_expiration`()
BEGIN
    DECLARE v_today DATE;
    SET v_today = CURDATE();
    
    -- 更新已过期的VIP状态
    UPDATE user_vip_info 
    SET 
        vip_status = 'EXPIRED',
        updated_at = NOW()
    WHERE vip_status = 'ACTIVE' 
      AND vip_expire_date IS NOT NULL 
      AND vip_expire_date < v_today;
    
    -- 处理等级到期(降级逻辑)
    UPDATE user_vip_info vi
    JOIN vip_level_config vlc ON vi.vip_level = vlc.vip_level
    SET 
        vi.vip_level = vi.vip_level - 1,
        vi.level_expire_date = NULL,
        vi.updated_at = NOW()
    WHERE vi.level_expire_date IS NOT NULL 
      AND vi.level_expire_date < v_today
      AND vi.vip_level > 0;
    
    -- 记录降级日志
    INSERT INTO user_vip_log 
    (user_id, old_vip_level, new_vip_level, old_vip_points, new_vip_points, change_type, change_reason)
    SELECT 
        vi.user_id,
        vi.vip_level + 1,  -- 原等级
        vi.vip_level,      -- 新等级
        vi.vip_points,
        vi.vip_points,
        'DOWNGRADE',
        '等级有效期到期, 自动降级'
    FROM user_vip_info vi
    WHERE vi.level_expire_date IS NOT NULL 
      AND vi.level_expire_date < v_today
      AND vi.vip_level > 0;
END$$

-- -- 手动调整用户积分
-- -- DROP PROCEDURE IF EXISTS `sp_adjust_user_points`;
-- CREATE PROCEDURE `sp_adjust_user_points`(
--     IN p_user_id INT,
--     IN p_points_change INT,
-- --     IN p_points_type ENUM('SIGN_IN', 'TASK', 'PURCHASE', 'CONSUME', 'ADMIN_ADJUST', 'REFUND', 'OTHER'),
--     IN p_points_type VARCHAR(20),
--     IN p_description VARCHAR(255),
--     IN p_operator_id INT
-- )
-- BEGIN
--     DECLARE v_new_total INT;
--     DECLARE v_new_available INT;
--     DECLARE v_points_type_enum VARCHAR(20);
--     
--     -- 将 points_type 转换为大写并修剪空格
--     SET v_points_type_enum = UPPER(TRIM(p_points_type));
--     
--     -- 验证 points_type 是否在允许的枚举值中
--     IF v_points_type_enum NOT IN ('SIGN_IN', 'TASK', 'PURCHASE', 'CONSUME', 'ADMIN_ADJUST', 'REFUND', 'OTHER') THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '无效的积分类型, 允许的值: SIGN_IN, TASK, PURCHASE, CONSUME, ADMIN_ADJUST, REFUND, OTHER';
--     END IF;
--     
--     -- 验证用户是否存在
--     IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = p_user_id) THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '用户不存在';
--     END IF;
--     
--     -- 验证操作员是否存在(如果提供了操作员ID)
--     IF p_operator_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM users WHERE user_id = p_operator_id) THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '操作员不存在';
--     END IF;
--     
--     -- 验证积分变更值不为0
--     IF p_points_change = 0 THEN
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '积分变更值不能为0';
--     END IF;
--     
--     -- 开始事务
--     START TRANSACTION;
--     
--     -- 确保用户积分记录存在
--     IF NOT EXISTS (SELECT 1 FROM user_points WHERE user_id = p_user_id) THEN
--         INSERT INTO user_points (user_id, total_points, available_points, frozen_points, consumed_points)
--         VALUES (p_user_id, 0, 0, 0, 0);
--     END IF;
--     
--     -- 更新用户积分
--     UPDATE user_points 
--     SET 
--         total_points = total_points + p_points_change,
--         available_points = available_points + p_points_change,
--         updated_at = NOW()
--     WHERE user_id = p_user_id;
--     
--     -- 检查更新是否成功
--     IF ROW_COUNT() = 0 THEN
--         ROLLBACK;
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '更新用户积分失败';
--     END IF;
--     
--     -- 获取更新后的值
--     SELECT total_points, available_points INTO v_new_total, v_new_available
--     FROM user_points 
--     WHERE user_id = p_user_id;
--     
--     -- 检查积分是否为负
--     IF v_new_total < 0 THEN
--         ROLLBACK;
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '积分不能为负数';
--     END IF;
--     
--     IF v_new_available < 0 THEN
--         ROLLBACK;
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '可用积分不能为负数';
--     END IF;
--     
--     -- 记录积分变更日志 (使用转换后的枚举值)
--     INSERT INTO user_points_log 
--     (user_id, points_change, points_type, current_total, current_available, description, operator_id)
--     VALUES 
--     (p_user_id, p_points_change, v_points_type_enum, v_new_total, v_new_available, p_description, p_operator_id);
--     
--     -- 检查日志记录是否成功
--     IF ROW_COUNT() = 0 THEN
--         ROLLBACK;
--         SIGNAL SQLSTATE '45000' 
--         SET MESSAGE_TEXT = '记录积分变更日志失败';
--     END IF;
--     
--     COMMIT;
--     
--     -- 返回结果
--     SELECT 
--         '成功' as result,
--         p_user_id as user_id,
--         p_points_change as points_change,
--         v_points_type_enum as points_type,
--         v_new_total as new_total_points,
--         v_new_available as new_available_points,
--         p_description as description;
-- END$$

-- 批量更新用户next_level_required字段
CREATE PROCEDURE `sp_update_all_next_level_required`()
BEGIN
    -- 更新所有用户的next_level_required
    UPDATE `user_vip_info` uvi
    LEFT JOIN `vip_level_config` next ON next.vip_level = uvi.vip_level + 1
    SET uvi.next_level_required = next.min_points
    WHERE uvi.vip_level < 9;
    
    -- 设置最高等级用户的next_level_required为NULL
    UPDATE user_vip_info 
    SET next_level_required = NULL 
    WHERE vip_level = 9;
    
    SELECT CONCAT('已更新', ROW_COUNT(), '条记录的next_level_required字段') as result;
END$$

DELIMITER ;













-- ============================================
-- 用户反馈相关存储过程
-- ============================================

DELIMITER $$

-- 获取用户反馈统计信息的存储过程
-- DROP PROCEDURE IF EXISTS `sp_get_user_feedback_stats`;
CREATE PROCEDURE `sp_get_user_feedback_stats`(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    -- 创建临时表存储统计结果
    CREATE TEMPORARY TABLE IF NOT EXISTS temp_feedback_stats (
        stat_type VARCHAR(50),
        feedback_count INT,
        user_count INT,
        pending_count INT,
        processing_count INT,
        resolved_count INT,
        closed_count INT,
        avg_content_length DECIMAL(10,2),
        avg_processing_hours DECIMAL(10,1),
        sort_order INT
    );
    
    -- 清空临时表
    DELETE FROM temp_feedback_stats;
    
    -- 总体统计
    INSERT INTO temp_feedback_stats
    SELECT 
        '总体统计' as stat_type,
        COUNT(*) as feedback_count,
        COUNT(DISTINCT user_id) as user_count,
        COUNT(CASE WHEN status = 1 THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 2 THEN 1 END) as processing_count,
        COUNT(CASE WHEN status = 3 THEN 1 END) as resolved_count,
        COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count,
        ROUND(AVG(LENGTH(content)), 2) as avg_content_length,
        ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, 
            CASE WHEN status IN (3, 4) THEN updated_at ELSE NOW() END)), 1) as avg_processing_hours,
        0 as sort_order
    FROM user_feedback
    WHERE (p_start_date IS NULL OR DATE(created_at) >= p_start_date)
      AND (p_end_date IS NULL OR DATE(created_at) <= p_end_date);
    
    -- 按类型统计
    INSERT INTO temp_feedback_stats
    SELECT 
        CONCAT('类型', type, ' - ', 
            CASE type
                WHEN 1 THEN '系统问题'
                WHEN 2 THEN '功能建议'
                WHEN 3 THEN 'BUG反馈'
                WHEN 4 THEN '其他'
                ELSE '未知'
            END) as stat_type,
        COUNT(*) as feedback_count,
        COUNT(DISTINCT user_id) as user_count,
        COUNT(CASE WHEN status = 1 THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 2 THEN 1 END) as processing_count,
        COUNT(CASE WHEN status = 3 THEN 1 END) as resolved_count,
        COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count,
        ROUND(AVG(LENGTH(content)), 2) as avg_content_length,
        ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, 
            CASE WHEN status IN (3, 4) THEN updated_at ELSE NOW() END)), 1) as avg_processing_hours,
        type as sort_order
    FROM user_feedback
    WHERE (p_start_date IS NULL OR DATE(created_at) >= p_start_date)
      AND (p_end_date IS NULL OR DATE(created_at) <= p_end_date)
    GROUP BY type;
    
    -- 返回结果, 按 sort_order 排序
    SELECT 
        stat_type as '统计类型',
        feedback_count as '反馈总数',
        user_count as '反馈用户数',
        pending_count as '待处理数',
        processing_count as '处理中数',
        resolved_count as '已解决数',
        closed_count as '已关闭数',
        avg_content_length as '平均内容长度',
        avg_processing_hours as '平均处理时长(小时)'
    FROM temp_feedback_stats
    ORDER BY sort_order;
    
    -- 删除临时表
    DROP TEMPORARY TABLE IF EXISTS temp_feedback_stats;
END$$

-- 更新反馈状态并回复
CREATE PROCEDURE `sp_update_feedback_status`(
    IN p_feedback_id BIGINT,
    IN p_new_status TINYINT,
    IN p_reply_content TEXT,
    IN p_operator_id INT
)
BEGIN
    DECLARE v_old_status TINYINT;
    DECLARE v_user_id INT;
    DECLARE v_feedback_content TEXT;
    
    -- 获取原始状态和用户ID
    SELECT status, user_id, content INTO v_old_status, v_user_id, v_feedback_content
    FROM user_feedback WHERE id = p_feedback_id;
    
    IF v_old_status IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = '反馈记录不存在';
    END IF;
    
    -- 更新反馈
    UPDATE user_feedback 
    SET 
        status = p_new_status,
        reply = IFNULL(p_reply_content, reply),
        updated_at = NOW()
    WHERE id = p_feedback_id;
    
    -- 记录操作日志
    INSERT INTO user_logs 
    (user_id, level, action, details, status)
    VALUES 
    (IFNULL(p_operator_id, v_user_id), 
     'INFO', 
     'UPDATE_FEEDBACK', 
     CONCAT('更新反馈状态: ID=', p_feedback_id, ', 从', v_old_status, '到', p_new_status, 
            ', 内容预览:', LEFT(v_feedback_content, 100)),
     1);
     
    -- 返回更新后的反馈信息
    SELECT 
        '反馈状态更新成功' as result,
        p_feedback_id as feedback_id,
        v_old_status as old_status,
        p_new_status as new_status,
        v_user_id as user_id;
END$$

-- 获取用户反馈历史
CREATE PROCEDURE `sp_get_user_feedback_history`(
    IN p_user_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN
    -- 用户反馈记录
    SELECT 
        f.id,
        f.type,
        CASE f.type
            WHEN 1 THEN '系统问题'
            WHEN 2 THEN '功能建议'
            WHEN 3 THEN 'BUG反馈'
            WHEN 4 THEN '其他'
            ELSE '未知类型'
        END as type_name,
        LEFT(f.content, 200) as content_preview,
        f.status,
        CASE f.status
            WHEN 1 THEN '待处理'
            WHEN 2 THEN '已受理'
            WHEN 3 THEN '已解决'
            WHEN 4 THEN '已关闭'
            ELSE '未知状态'
        END as status_name,
        f.reply,
        f.created_at,
        f.updated_at,
        TIMESTAMPDIFF(HOUR, f.created_at, IFNULL(f.updated_at, NOW())) as processing_hours,
        CASE 
            WHEN f.reply IS NOT NULL THEN '已回复'
            ELSE '未回复'
        END as reply_status
    FROM user_feedback f
    WHERE f.user_id = p_user_id
    ORDER BY f.created_at DESC
    LIMIT p_limit OFFSET p_offset;
    
    -- 统计信息
    SELECT 
        COUNT(*) as total_count,
        COUNT(CASE WHEN status = 1 THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 2 THEN 1 END) as processing_count,
        COUNT(CASE WHEN status = 3 THEN 1 END) as resolved_count,
        COUNT(CASE WHEN status = 4 THEN 1 END) as closed_count,
        COUNT(CASE WHEN reply IS NOT NULL THEN 1 END) as replied_count,
        ROUND(AVG(LENGTH(content))) as avg_content_length,
        MIN(created_at) as first_feedback_date,
        MAX(created_at) as last_feedback_date
    FROM user_feedback
    WHERE user_id = p_user_id;
END$$

DELIMITER ;












-- ============================================
-- VIP体系定时任务(事件)
-- ============================================

-- 创建事件调度器(需要MySQL事件调度器启用)
DELIMITER $$

CREATE EVENT IF NOT EXISTS `event_daily_points_reset`
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '00:05:00')
COMMENT '每日重置成长值计数'
DO
BEGIN
    CALL sp_reset_daily_points();
END$$

CREATE EVENT IF NOT EXISTS `event_check_vip_expiration`
ON SCHEDULE EVERY 1 DAY
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '01:00:00')
COMMENT '每日检查VIP到期状态'
DO
BEGIN
    CALL sp_check_vip_expiration();
END$$

CREATE EVENT IF NOT EXISTS `event_update_next_level_required`
ON SCHEDULE EVERY 1 MONTH
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 MONTH, '02:00:00')
COMMENT '每月更新用户的next_level_required字段'
DO
BEGIN
    CALL sp_update_all_next_level_required();
END$$

DELIMITER ;






















-- ============================================
-- License相关视图
-- ============================================

-- License详情视图
CREATE VIEW `license_detail_view` AS
SELECT 
    li.id,
    li.license_key,
    li.license_id,
    li.user_name,
    li.company_name,
    li.contact_email,
    li.product_version,
    li.features,
    li.start_time,
    li.end_time,
    li.hardware_info,
    li.license_type,
    li.max_concurrent_users,
    li.allow_offline,
    li.status,
    li.activation_code,
    li.last_activation_time,
    li.created_by,
    li.updated_by,
    li.remarks,
    li.created_at,
    li.updated_at,
    -- 计算有效期天数
    DATEDIFF(li.end_time, li.start_time) as total_days,
    -- 计算剩余天数
    DATEDIFF(li.end_time, CURDATE()) as remaining_days,
    -- 状态描述
    CASE li.status
        WHEN 'ACTIVE' THEN '活跃'
        WHEN 'EXPIRED' THEN '已过期'
        WHEN 'REVOKED' THEN '已吊销'
        WHEN 'PENDING_ACTIVATION' THEN '待激活'
        WHEN 'SUSPENDED' THEN '已暂停'
        ELSE '未知状态'
    END as status_name,
    -- 许可证类型描述
    CASE li.license_type
        WHEN 'TRIAL' THEN '试用版'
        WHEN 'BASIC' THEN '基础版'
        WHEN 'PREMIUM' THEN '高级版'
        WHEN 'ENTERPRISE' THEN '企业版'
        WHEN 'CUSTOM' THEN '定制版'
        ELSE '未知类型'
    END as license_type_name
FROM license_info li;

-- License到期提醒视图
CREATE VIEW `license_expiration_reminder_view` AS
SELECT 
    li.license_key,
    li.license_id,
    li.user_name,
    li.company_name,
    li.contact_email,
    li.license_type,
    li.status,
    li.start_time,
    li.end_time,
    DATEDIFF(li.end_time, CURDATE()) as days_to_expire,
    CASE 
        WHEN li.end_time < CURDATE() THEN '已过期'
        WHEN li.end_time BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY) THEN '7天内到期'
        WHEN li.end_time BETWEEN DATE_ADD(CURDATE(), INTERVAL 8 DAY) AND DATE_ADD(CURDATE(), INTERVAL 30 DAY) THEN '30天内到期'
        ELSE '正常'
    END as expiration_status
FROM license_info li
WHERE li.status = 'ACTIVE'
  AND li.end_time <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
ORDER BY days_to_expire ASC;

-- -- License使用统计视图
-- CREATE VIEW `license_usage_stats_view` AS
-- SELECT 
--     li.license_key,
--     li.license_id,
--     li.license_type,
--     li.status,
--     COUNT(lul.log_id) as total_operations,
--     SUM(CASE WHEN lul.status = 1 THEN 1 ELSE 0 END) as successful_operations,
--     SUM(CASE WHEN lul.status = 0 THEN 1 ELSE 0 END) as failed_operations,
--     COUNT(DISTINCT lul.ip_address) as unique_ips,
--     MIN(lul.created_at) as first_operation_time,
--     MAX(lul.created_at) as last_operation_time
-- FROM license_info li
-- LEFT JOIN license_usage_log lul ON li.license_key = lul.license_key
-- GROUP BY li.license_key, li.license_id, li.license_type, li.status;

-- License变更历史视图
CREATE VIEW `license_change_history_view` AS
SELECT 
    lcl.log_id,
    lcl.license_key,
    li.license_id,
    li.user_name,
    lcl.change_type,
    lcl.old_value,
    lcl.new_value,
    lcl.operator,
    lcl.reason,
    lcl.created_at as change_time
FROM license_change_log lcl
JOIN license_info li ON lcl.license_key = li.license_key
ORDER BY lcl.created_at DESC;

-- License状态分布视图
CREATE VIEW `license_status_distribution_view` AS
SELECT 
    status,
    CASE status
        WHEN 'ACTIVE' THEN '活跃'
        WHEN 'EXPIRED' THEN '已过期'
        WHEN 'REVOKED' THEN '已吊销'
        WHEN 'PENDING_ACTIVATION' THEN '待激活'
        WHEN 'SUSPENDED' THEN '已暂停'
        ELSE '未知状态'
    END as status_name,
    COUNT(*) as license_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM license_info), 2) as percentage
FROM license_info
GROUP BY status
ORDER BY 
    CASE status
        WHEN 'ACTIVE' THEN 1
        WHEN 'PENDING_ACTIVATION' THEN 2
        WHEN 'SUSPENDED' THEN 3
        WHEN 'EXPIRED' THEN 4
        WHEN 'REVOKED' THEN 5
        ELSE 6
    END;

-- License用户关联详情视图
CREATE VIEW `license_user_detail_view` AS
SELECT 
    lur.relation_id,
    lur.license_key,
    li.license_id,
    li.license_type,
    li.status as license_status,
    li.start_time,
    li.end_time,
    li.max_concurrent_users,
    lur.user_id,
    u.username,
    un.display_name,
    lur.status as relation_status,
    lur.assigned_by,
    ass.username as assigned_by_username,
    lur.assigned_at,
    lur.expires_at,
    lur.last_used_at,
    DATEDIFF(li.end_time, CURDATE()) as days_to_expire
FROM license_user_relation lur
JOIN license_info li ON lur.license_key = li.license_key
JOIN users u ON lur.user_id = u.user_id
LEFT JOIN user_names un ON lur.user_id = un.user_id
LEFT JOIN users ass ON lur.assigned_by = ass.user_id
WHERE li.status = 'ACTIVE'
  AND lur.status = 'ACTIVE'
  AND li.end_time > NOW();

-- License使用情况统计视图
CREATE VIEW `license_usage_stats_view` AS
SELECT 
    li.license_key,
    li.license_id,
    li.license_type,
    li.status as license_status,
    li.start_time,
    li.end_time,
    li.max_concurrent_users,
    COUNT(DISTINCT lur.user_id) as assigned_users,
    COUNT(DISTINCT CASE WHEN lur.last_used_at > DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN lur.user_id END) as active_users_24h,
    COUNT(DISTINCT CASE WHEN lur.last_used_at > DATE_SUB(NOW(), INTERVAL 7 DAY) THEN lur.user_id END) as active_users_7d,
    COUNT(DISTINCT CASE WHEN lur.last_used_at > DATE_SUB(NOW(), INTERVAL 30 DAY) THEN lur.user_id END) as active_users_30d,
    DATEDIFF(li.end_time, CURDATE()) as days_to_expire,
    CASE 
        WHEN li.max_concurrent_users IS NULL THEN 'Unlimited'
        WHEN COUNT(DISTINCT lur.user_id) > li.max_concurrent_users THEN 'Over limit'
        ELSE 'Within limit'
    END as user_limit_status
FROM license_info li
LEFT JOIN license_user_relation lur ON li.license_key = lur.license_key AND lur.status = 'ACTIVE'
GROUP BY li.license_key, li.license_id, li.license_type, li.status, li.start_time, li.end_time, li.max_concurrent_users;

-- 用户许可证详情视图
CREATE VIEW `user_license_detail_view` AS
SELECT 
    lur.relation_id,
    lur.user_id,
    u.username,
    un.display_name,
    lur.license_key,
    li.license_id,
    li.license_type,
    li.status as license_status,
    li.start_time,
    li.end_time,
    li.max_concurrent_users,
    li.hardware_info,
    li.remarks,
    lur.status as relation_status,
    lur.assigned_at,
    lur.expires_at,
    lur.last_used_at,
    DATEDIFF(li.end_time, CURDATE()) as days_to_expire
FROM license_user_relation lur
JOIN license_info li ON lur.license_key = li.license_key
JOIN users u ON lur.user_id = u.user_id
LEFT JOIN user_names un ON lur.user_id = un.user_id
ORDER BY lur.assigned_at DESC;

-- ============================================
-- License相关存储过程和函数
-- ============================================

-- -- 生成许可证密钥
-- DELIMITER //
-- CREATE FUNCTION `generate_license_key`() RETURNS VARCHAR(255) NO SQL
-- BEGIN
--     DECLARE license_key VARCHAR(255);
--     SET license_key = CONCAT('LIC-', 
--         UPPER(SUBSTRING(MD5(RAND() + NOW()), 1, 8)), '-',
--         UPPER(SUBSTRING(MD5(RAND() + NOW() + 1), 1, 8)), '-',
--         UPPER(SUBSTRING(MD5(RAND() + NOW() + 2), 1, 8))
--     );
--     RETURN license_key;
-- END //
-- DELIMITER ;

-- 生成许可证ID
DELIMITER //
CREATE FUNCTION `generate_license_id`() RETURNS VARCHAR(100) NO SQL
BEGIN
    DECLARE license_id VARCHAR(100);
    SET license_id = CONCAT('LID-', 
        DATE_FORMAT(NOW(), '%Y%m%d'), '-',
        LPAD(FLOOR(RAND() * 10000), 4, '0')
    );
    RETURN license_id;
END //
DELIMITER ;

-- 生成激活码
DELIMITER //
CREATE FUNCTION `generate_activation_code`() RETURNS VARCHAR(255) NO SQL
BEGIN
    DECLARE activation_code VARCHAR(255);
--     SET activation_code = UPPER(SUBSTRING(MD5(RAND() + NOW() + RAND()), 1, 20));
    SET activation_code = UPPER(SUBSTRING(REPLACE(UUID(), '-', ''), 1, 20));
    RETURN activation_code;
END //
DELIMITER ;

-- 验证许可证
DELIMITER //
CREATE PROCEDURE `validate_license`(IN p_license_key VARCHAR(255), OUT p_valid BOOLEAN, OUT p_message VARCHAR(255))
BEGIN
    DECLARE v_status VARCHAR(50);
    DECLARE v_end_time DATETIME;
    
    SELECT status, end_time INTO v_status, v_end_time
    FROM license_info
    WHERE license_key = p_license_key;
    
    IF v_status IS NULL THEN
        SET p_valid = FALSE;
        SET p_message = '许可证不存在';
    ELSEIF v_status = 'REVOKED' THEN
        SET p_valid = FALSE;
        SET p_message = '许可证已吊销';
    ELSEIF v_status = 'SUSPENDED' THEN
        SET p_valid = FALSE;
        SET p_message = '许可证已暂停';
    ELSEIF v_status = 'PENDING_ACTIVATION' THEN
        SET p_valid = FALSE;
        SET p_message = '许可证未激活';
    ELSEIF v_status = 'EXPIRED' THEN
        SET p_valid = FALSE;
        SET p_message = '许可证已过期';
    ELSEIF v_end_time < NOW() THEN
        -- 更新状态为已过期
        UPDATE license_info
        SET status = 'EXPIRED'
        WHERE license_key = p_license_key;
        SET p_valid = FALSE;
        SET p_message = '许可证已过期';
    ELSE
        SET p_valid = TRUE;
        SET p_message = '许可证有效';
    END IF;
END //
DELIMITER ;

-- 激活许可证
DELIMITER //
CREATE PROCEDURE `activate_license`(IN p_activation_code VARCHAR(255), IN p_hardware_info TEXT, OUT p_success BOOLEAN, OUT p_message VARCHAR(255))
BEGIN
    DECLARE v_license_key VARCHAR(255);
    
    SELECT license_key INTO v_license_key
    FROM license_info
    WHERE activation_code = p_activation_code
    AND status = 'PENDING_ACTIVATION';
    
    IF v_license_key IS NULL THEN
        SET p_success = FALSE;
        SET p_message = '激活码无效或许可证状态不正确';
    ELSE
        -- 更新许可证状态
        UPDATE license_info
        SET status = 'ACTIVE',
            hardware_info = p_hardware_info,
            last_activation_time = NOW()
        WHERE license_key = v_license_key;
        
        -- 记录变更
        INSERT INTO license_change_log (license_key, change_type, old_value, new_value, reason)
        VALUES (v_license_key, 'ACTIVATE', 'PENDING_ACTIVATION', 'ACTIVE', '许可证激活');
        
        SET p_success = TRUE;
        SET p_message = '许可证激活成功';
    END IF;
END //
DELIMITER ;

-- 延长许可证有效期
DELIMITER //
CREATE PROCEDURE `extend_license`(IN p_license_key VARCHAR(255), IN p_days INT, OUT p_success BOOLEAN, OUT p_message VARCHAR(255))
BEGIN
    DECLARE v_current_end_time DATETIME;
    DECLARE v_new_end_time DATETIME;
    
    SELECT end_time INTO v_current_end_time
    FROM license_info
    WHERE license_key = p_license_key;
    
    IF v_current_end_time IS NULL THEN
        SET p_success = FALSE;
        SET p_message = '许可证不存在';
    ELSE
        SET v_new_end_time = DATE_ADD(v_current_end_time, INTERVAL p_days DAY);
        
        -- 更新有效期
        UPDATE license_info
        SET end_time = v_new_end_time,
            status = 'ACTIVE' -- 如果已过期, 重新激活
        WHERE license_key = p_license_key;
        
        -- 记录变更
        INSERT INTO license_change_log (license_key, change_type, old_value, new_value, reason)
        VALUES (p_license_key, 'EXTEND', 
            CONCAT('End Time: ', DATE_FORMAT(v_current_end_time, '%Y-%m-%d %H:%i:%s')), 
            CONCAT('End Time: ', DATE_FORMAT(v_new_end_time, '%Y-%m-%d %H:%i:%s')), 
            CONCAT('延长有效期 ', p_days, ' 天')
        );
        
        SET p_success = TRUE;
        SET p_message = CONCAT('许可证有效期已延长 ', p_days, ' 天');
    END IF;
END //
DELIMITER ;

-- 吊销许可证
DELIMITER //
CREATE PROCEDURE `revoke_license`(IN p_license_key VARCHAR(255), IN p_reason VARCHAR(255), OUT p_success BOOLEAN, OUT p_message VARCHAR(255))
BEGIN
    DECLARE v_exists INT;
    
    SELECT COUNT(*) INTO v_exists
    FROM license_info
    WHERE license_key = p_license_key;
    
    IF v_exists = 0 THEN
        SET p_success = FALSE;
        SET p_message = '许可证不存在';
    ELSE
        -- 更新状态
        UPDATE license_info
        SET status = 'REVOKED'
        WHERE license_key = p_license_key;
        
        -- 记录变更
        INSERT INTO license_change_log (license_key, change_type, old_value, new_value, reason)
        VALUES (p_license_key, 'REVOKE', 'ACTIVE', 'REVOKED', p_reason);
        
        SET p_success = TRUE;
        SET p_message = '许可证已吊销';
    END IF;
END //
DELIMITER ;

-- 检查许可证用户数是否超过限制
DELIMITER //
CREATE FUNCTION `check_license_user_limit`(p_license_key VARCHAR(255)) RETURNS BOOLEAN READS SQL DATA
BEGIN
    DECLARE v_max_users INT;
    DECLARE v_assigned_users INT;
    
    -- 获取许可证最大用户数
    SELECT max_concurrent_users INTO v_max_users
    FROM license_info
    WHERE license_key = p_license_key;
    
    -- 如果没有限制, 返回TRUE
    IF v_max_users IS NULL THEN
        RETURN TRUE;
    END IF;
    
    -- 获取已分配用户数
    SELECT COUNT(*) INTO v_assigned_users
    FROM license_user_relation
    WHERE license_key = p_license_key
    AND status = 'ACTIVE';
    
    -- 检查是否超过限制
    IF v_assigned_users >= v_max_users THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END //
DELIMITER ;

-- 验证许可证是否有效
DELIMITER //
CREATE FUNCTION `validate_license`(p_license_key VARCHAR(255), p_hardware_info TEXT) RETURNS BOOLEAN READS SQL DATA
BEGIN
    DECLARE v_status VARCHAR(20);
    DECLARE v_end_time DATETIME;
    DECLARE v_hardware_info TEXT;
    DECLARE v_is_valid BOOLEAN DEFAULT FALSE;
    
    -- 获取许可证信息
    SELECT status, end_time, hardware_info INTO v_status, v_end_time, v_hardware_info
    FROM license_info
    WHERE license_key = p_license_key;
    
    -- 检查许可证是否存在
    IF v_status IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- 检查许可证状态
    IF v_status != 'ACTIVE' THEN
        RETURN FALSE;
    END IF;
    
    -- 检查许可证是否过期
    IF v_end_time < NOW() THEN
        RETURN FALSE;
    END IF;
    
    -- 检查硬件绑定
    IF v_hardware_info IS NOT NULL AND v_hardware_info != '' AND v_hardware_info != p_hardware_info THEN
        RETURN FALSE;
    END IF;
    
    -- 检查用户数限制
    IF NOT check_license_user_limit(p_license_key) THEN
        RETURN FALSE;
    END IF;
    
    RETURN TRUE;
END //
DELIMITER ;

-- 生成许可证密钥
DELIMITER //
CREATE FUNCTION `generate_license_key`(p_license_type VARCHAR(50)) RETURNS VARCHAR(255) READS SQL DATA
BEGIN
    DECLARE v_year INT;
    DECLARE v_count INT;
    DECLARE v_license_key VARCHAR(255);
    
    -- 获取当前年份
    SET v_year = YEAR(NOW());
    
    -- 统计该类型许可证数量
    SELECT COUNT(*) INTO v_count
    FROM license_info
    WHERE license_type = p_license_type
    AND YEAR(start_time) = v_year;
    
    -- 生成许可证密钥
    SET v_license_key = CONCAT('LIC-', UPPER(p_license_type), '-', v_year, '-', LPAD(v_count + 1, 4, '0'));
    
    RETURN v_license_key;
END //
DELIMITER ;

-- ============================================
-- License相关事件
-- ============================================

-- 每天检查过期许可证
DELIMITER //
CREATE EVENT `check_expired_licenses`
ON SCHEDULE EVERY 1 DAY 
-- STARTS '2026-01-01 00:00:00'
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '00:00:00')
DO BEGIN
    -- 更新过期的许可证状态
    UPDATE license_info
    SET status = 'EXPIRED'
    WHERE status = 'ACTIVE'
    AND end_time < NOW();
    
    -- 记录变更
    INSERT INTO license_change_log (license_key, change_type, old_value, new_value, reason)
    SELECT license_key, 'EXPIRE', 'ACTIVE', 'EXPIRED', '许可证过期'
    FROM license_info
    WHERE status = 'EXPIRED'
    AND DATE(updated_at) = CURRENT_DATE();
END //
DELIMITER ;

-- 每周生成许可证到期提醒
DELIMITER //
CREATE EVENT `generate_license_expiration_reminders`
ON SCHEDULE EVERY 1 WEEK 
-- STARTS '2026-01-01 08:00:00'
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '08:00:00')
DO BEGIN
    -- TODO: 查询7天内到期的许可证发送邮件或其他通知的逻辑
    INSERT INTO license_usage_log (license_key, action, details, status)
    SELECT license_key, 'REMINDER', CONCAT('许可证将在 ', DATEDIFF(end_time, NOW()), ' 天后过期'), 1
    FROM license_info
    WHERE status = 'ACTIVE'
    AND end_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 7 DAY);
END //
DELIMITER ;

-- 定期检查并更新过期许可证状态
DELIMITER //
CREATE EVENT `check_license_expiration`
ON SCHEDULE EVERY 1 HOUR
DO
BEGIN
    -- 更新过期许可证状态
    UPDATE license_info
    SET status = 'EXPIRED'
    WHERE status = 'ACTIVE'
    AND end_time < NOW();
    
    -- 更新过期的许可证用户关联
    UPDATE license_user_relation lur
    JOIN license_info li ON lur.license_key = li.license_key
    SET lur.status = 'EXPIRED'
    WHERE lur.status = 'ACTIVE'
    AND li.status = 'EXPIRED';
END //
DELIMITER ;

-- 定期清理过期的许可证用户关联
DELIMITER //
CREATE EVENT `cleanup_expired_license_relations`
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- 删除30天前过期的关联
    DELETE FROM license_user_relation
    WHERE status = 'EXPIRED'
    AND expires_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
END //
DELIMITER ;






















-- ============================================
-- 用户签到相关视图
-- ============================================

-- 用户签到详情视图
CREATE VIEW `sign_in_detail_view` AS
SELECT 
    usi.sign_in_id,
    usi.user_id,
    u.username,
    un.display_name,
    up.nickname,
    usi.sign_in_date,
    usi.continuous_days,
    usi.points_reward,
    usi.created_at as sign_in_time,
    -- 连续签到奖励配置
    sic.points_reward as configured_reward,
    -- 用户附加信息
    vi.vip_level,
    up2.total_points,
    -- 签到状态
    CASE 
        WHEN DATE(usi.sign_in_date) = CURDATE() THEN '今日已签到'
        WHEN DATE(usi.sign_in_date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) THEN '昨日已签到'
        ELSE '历史签到'
    END as sign_in_status
FROM sign_in usi
LEFT JOIN users u ON usi.user_id = u.user_id
LEFT JOIN user_names un ON usi.user_id = un.user_id
LEFT JOIN user_profiles up ON usi.user_id = up.user_id
LEFT JOIN user_vip_info vi ON usi.user_id = vi.user_id
LEFT JOIN user_points up2 ON usi.user_id = up2.user_id
LEFT JOIN sign_in_config sic ON usi.continuous_days = sic.continuous_days AND sic.is_active = 1;

-- 用户签到统计视图
CREATE VIEW `sign_in_stats_view` AS
SELECT 
    usi.user_id,
    u.username,
    un.display_name,
    COUNT(*) as total_sign_ins,
    MAX(usi.continuous_days) as max_continuous_days,
    SUM(usi.points_reward) as total_points_earned,
    COUNT(DISTINCT DATE(usi.sign_in_date)) as unique_sign_in_days,
    -- 本月签到统计
    COUNT(CASE WHEN DATE_FORMAT(usi.sign_in_date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') THEN 1 END) as monthly_sign_ins,
    -- 连续签到状态
    CASE 
        WHEN MAX(usi.sign_in_date) = CURDATE() THEN '今日已签到'
        WHEN MAX(usi.sign_in_date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY) THEN '连续签到中'
        ELSE '连续签到已中断'
    END as continuous_status,
    -- 最后签到信息
    MAX(usi.sign_in_date) as last_sign_in_date,
    MIN(usi.sign_in_date) as first_sign_in_date,
    DATEDIFF(NOW(), MIN(usi.sign_in_date)) as days_since_first_sign_in,
    -- 用户附加信息
    vi.vip_level,
    up2.total_points
FROM sign_in usi
LEFT JOIN users u ON usi.user_id = u.user_id
LEFT JOIN user_names un ON usi.user_id = un.user_id
LEFT JOIN user_vip_info vi ON usi.user_id = vi.user_id
LEFT JOIN user_points up2 ON usi.user_id = up2.user_id
GROUP BY usi.user_id, u.username, un.display_name, vi.vip_level, up2.total_points
ORDER BY total_sign_ins DESC;

-- 用户月度签到日历视图
CREATE VIEW `user_monthly_sign_in_view` AS
SELECT 
    usi.user_id,
    u.username,
    un.display_name,
    DATE_FORMAT(usi.sign_in_date, '%Y-%m') as sign_in_month,
    DATE_FORMAT(usi.sign_in_date, '%d') as sign_in_day,
    usi.continuous_days,
    usi.points_reward,
    usi.created_at as sign_in_time
FROM sign_in usi
LEFT JOIN users u ON usi.user_id = u.user_id
LEFT JOIN user_names un ON usi.user_id = un.user_id
ORDER BY usi.user_id, usi.sign_in_date;

-- 签到配置视图
CREATE VIEW `sign_in_config_view` AS
SELECT 
    config_id,
    continuous_days,
    points_reward,
    is_active,
    CASE is_active
        WHEN 1 THEN '启用'
        ELSE '禁用'
    END as status_name,
    created_at,
    updated_at
FROM sign_in_config
ORDER BY continuous_days;

-- 系统签到统计视图
CREATE VIEW `system_sign_in_stats_view` AS
SELECT 
    COUNT(*) as total_sign_ins,
    COUNT(DISTINCT user_id) as unique_users,
    SUM(points_reward) as total_points_distributed,
    AVG(points_reward) as avg_points_per_sign_in,
    MAX(continuous_days) as max_continuous_days,
    -- 今日签到统计
    COUNT(CASE WHEN sign_in_date = CURDATE() THEN 1 END) as today_sign_ins,
    -- 昨日签到统计
    COUNT(CASE WHEN sign_in_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY) THEN 1 END) as yesterday_sign_ins,
    -- 本月签到统计
    COUNT(CASE WHEN DATE_FORMAT(sign_in_date, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') THEN 1 END) as monthly_sign_ins,
    -- 签到趋势
    COUNT(CASE WHEN sign_in_date >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as weekly_sign_ins,
    COUNT(CASE WHEN sign_in_date >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) as monthly_30d_sign_ins
FROM sign_in;

-- ============================================
-- 用户签到相关函数
-- ============================================

-- 计算用户连续签到天数的函数
DELIMITER //
CREATE FUNCTION `calculate_continuous_sign_in_days`(user_id_param BIGINT) RETURNS INT
READS SQL DATA
BEGIN
    DECLARE continuous_days INT DEFAULT 0;
    DECLARE current_dt DATE DEFAULT CURDATE();
    DECLARE sign_in_exists INT DEFAULT 0;
    
    check_sign_in_loop: WHILE TRUE DO
        SELECT COUNT(*) INTO sign_in_exists
        FROM sign_in
        WHERE user_id = user_id_param AND sign_in_date = current_dt;
        
        IF sign_in_exists = 0 THEN
            LEAVE check_sign_in_loop;
        END IF;
        
        SET continuous_days = continuous_days + 1;
        SET current_dt = DATE_SUB(current_dt, INTERVAL 1 DAY);
    END WHILE check_sign_in_loop;
    
    RETURN continuous_days;
END //
DELIMITER ;

-- 计算用户签到积分奖励的函数
DELIMITER //
CREATE FUNCTION `calculate_sign_in_reward`(user_id_param BIGINT) RETURNS INT
READS SQL DATA
BEGIN
    DECLARE continuous_days INT DEFAULT 1;
    DECLARE reward_points INT DEFAULT 0;
    DECLARE last_sign_in_date DATE;
    
    -- 获取用户最后签到日期
    SELECT MAX(sign_in_date) INTO last_sign_in_date
    FROM sign_in
    WHERE user_id = user_id_param;
    
    -- 计算连续签到天数
    IF last_sign_in_date IS NOT NULL THEN
        IF last_sign_in_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY) THEN
            SELECT continuous_days + 1 INTO continuous_days
            FROM sign_in
            WHERE user_id = user_id_param AND sign_in_date = last_sign_in_date;
        END IF;
    END IF;
    
    -- 获取对应连续天数的积分奖励
    SELECT points_reward INTO reward_points
    FROM sign_in_config
    WHERE continuous_days = continuous_days AND is_active = 1;
    
    -- 如果没有配置, 返回默认奖励
    IF reward_points IS NULL THEN
        IF continuous_days <= 3 THEN
            SET reward_points = 5;
        ELSEIF continuous_days <= 7 THEN
            SET reward_points = 10;
        ELSEIF continuous_days <= 15 THEN
            SET reward_points = 15;
        ELSE
            SET reward_points = 20;
        END IF;
    END IF;
    
    RETURN reward_points;
END //
DELIMITER ;

-- ============================================
-- 用户签到相关事件
-- ============================================

-- 每日凌晨更新用户签到状态的事件
DELIMITER //
CREATE EVENT IF NOT EXISTS `sign_in_daily_update`
ON SCHEDULE EVERY 1 DAY
-- STARTS '2026-01-01 00:00:00'
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '00:00:00')
ON COMPLETION PRESERVE
DO
BEGIN
    -- 为连续签到达到特定天数的用户发放额外奖励
    -- 连续签到7天、14天、30天的用户
    INSERT INTO user_points_log (user_id, points_change, points_type, current_total, current_available, description, reference_id)
    SELECT 
        usi.user_id,
        CASE 
            WHEN usi.continuous_days = 7 THEN 50
            WHEN usi.continuous_days = 14 THEN 100
            WHEN usi.continuous_days = 30 THEN 200
            ELSE 0
        END as points_change,
        'SIGN_IN' as points_type,
        up.total_points + CASE 
            WHEN usi.continuous_days = 7 THEN 50
            WHEN usi.continuous_days = 14 THEN 100
            WHEN usi.continuous_days = 30 THEN 200
            ELSE 0
        END as current_total,
        up.available_points + CASE 
            WHEN usi.continuous_days = 7 THEN 50
            WHEN usi.continuous_days = 14 THEN 100
            WHEN usi.continuous_days = 30 THEN 200
            ELSE 0
        END as current_available,
        CASE 
            WHEN usi.continuous_days = 7 THEN '连续签到7天额外奖励'
            WHEN usi.continuous_days = 14 THEN '连续签到14天额外奖励'
            WHEN usi.continuous_days = 30 THEN '连续签到30天额外奖励'
            ELSE ''
        END as description,
        CONCAT('continuous_', usi.continuous_days, '_', usi.user_id) as reference_id
    FROM sign_in usi
    JOIN user_points up ON usi.user_id = up.user_id
    WHERE usi.continuous_days IN (7, 14, 30)
    AND DATE(usi.sign_in_date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    AND NOT EXISTS (
        SELECT 1 FROM user_points_log upl
        WHERE upl.user_id = usi.user_id
        AND upl.description = CASE 
            WHEN usi.continuous_days = 7 THEN '连续签到7天额外奖励'
            WHEN usi.continuous_days = 14 THEN '连续签到14天额外奖励'
            WHEN usi.continuous_days = 30 THEN '连续签到30天额外奖励'
            ELSE ''
        END
    );
    
    -- 更新用户积分表中的总积分和可用积分
    UPDATE user_points up
    JOIN (
        SELECT 
            usi.user_id,
            CASE 
                WHEN usi.continuous_days = 7 THEN 50
                WHEN usi.continuous_days = 14 THEN 100
                WHEN usi.continuous_days = 30 THEN 200
                ELSE 0
            END as points_change
        FROM sign_in usi
        WHERE usi.continuous_days IN (7, 14, 30)
        AND DATE(usi.sign_in_date) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
        AND NOT EXISTS (
            SELECT 1 FROM user_points_log upl
            WHERE upl.user_id = usi.user_id
            AND upl.description = CASE 
                WHEN usi.continuous_days = 7 THEN '连续签到7天额外奖励'
                WHEN usi.continuous_days = 14 THEN '连续签到14天额外奖励'
                WHEN usi.continuous_days = 30 THEN '连续签到30天额外奖励'
                ELSE ''
            END
        )
    ) rewards ON up.user_id = rewards.user_id
    SET 
        up.total_points = up.total_points + rewards.points_change,
        up.available_points = up.available_points + rewards.points_change,
        up.updated_at = NOW();
    
    -- 记录用户连续签到中断的情况
    -- 为所有用户初始化签到状态(如果不存在)
    INSERT INTO sign_in_status (user_id, current_continuous_days, last_sign_in_date, is_continuous, total_sign_ins, max_continuous_days)
    SELECT 
        u.user_id,
        0 as current_continuous_days,
        NULL as last_sign_in_date,
        0 as is_continuous,
        0 as total_sign_ins,
        0 as max_continuous_days
    FROM users u
    WHERE NOT EXISTS (
        SELECT 1 FROM sign_in_status uss WHERE uss.user_id = u.user_id
    );
    
    -- 更新有签到记录的用户状态
    UPDATE sign_in_status uss
    JOIN (
        SELECT 
            user_id,
            MAX(sign_in_date) as last_sign_in_date,
            COUNT(*) as total_sign_ins,
            MAX(continuous_days) as max_continuous_days
        FROM user_sign_in
        GROUP BY user_id
    ) usi ON uss.user_id = usi.user_id
    SET 
        uss.last_sign_in_date = usi.last_sign_in_date,
        uss.total_sign_ins = usi.total_sign_ins,
        uss.max_continuous_days = GREATEST(uss.max_continuous_days, usi.max_continuous_days);
    
    -- 处理连续签到中断的用户
    -- 连续签到中断条件: 最后签到日期不是今天也不是昨天
    UPDATE sign_in_status uss
    SET 
        uss.is_continuous = 0,
        uss.current_continuous_days = 0
    WHERE 
        uss.is_continuous = 1
        AND uss.last_sign_in_date IS NOT NULL
        AND uss.last_sign_in_date NOT IN (CURDATE(), DATE_SUB(CURDATE(), INTERVAL 1 DAY));
    
    -- 处理连续签到中的用户
    -- 连续签到中条件: 最后签到日期是昨天
    UPDATE sign_in_status uss
    SET 
        uss.is_continuous = 1
    WHERE 
        uss.is_continuous = 0
        AND uss.last_sign_in_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
    
    -- 更新今日已签到用户的状态
    UPDATE sign_in_status uss
    JOIN (
        SELECT user_id, continuous_days
        FROM sign_in
        WHERE sign_in_date = CURDATE()
    ) today_sign_in ON uss.user_id = today_sign_in.user_id
    SET 
        uss.current_continuous_days = today_sign_in.continuous_days,
        uss.last_sign_in_date = CURDATE(),
        uss.is_continuous = 1,
        uss.total_sign_ins = uss.total_sign_ins + 1,
        uss.max_continuous_days = GREATEST(uss.max_continuous_days, today_sign_in.continuous_days);
END //
DELIMITER ;

-- 每月统计用户签到情况的事件
DELIMITER //
CREATE EVENT `sign_in_monthly_statistics`
ON SCHEDULE EVERY 1 MONTH
-- STARTS '2026-01-01 00:00:00'
STARTS TIMESTAMP(CURDATE() + INTERVAL 1 DAY, '00:00:00')
ON COMPLETION PRESERVE
DO
BEGIN
    -- 生成上月的签到报告
    SET @last_month = DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 1 MONTH), '%Y-%m');
    
    INSERT INTO sign_in_monthly_report (report_month, user_id, total_sign_ins, continuous_days, points_earned)
    SELECT 
        @last_month as report_month,
        usi.user_id,
        COUNT(*) as total_sign_ins,
        MAX(usi.continuous_days) as continuous_days,
        SUM(usi.points_reward) as points_earned
    FROM sign_in usi
    WHERE DATE_FORMAT(usi.sign_in_date, '%Y-%m') = @last_month
    GROUP BY usi.user_id
    ON DUPLICATE KEY UPDATE
        total_sign_ins = VALUES(total_sign_ins),
        continuous_days = VALUES(continuous_days),
        points_earned = VALUES(points_earned),
        updated_at = NOW();
    
    -- 更新月度排名
    SET @rank = 0;
    UPDATE sign_in_monthly_report msr
    JOIN (
        SELECT 
            report_id,
            @rank := @rank + 1 as new_rank
        FROM sign_in_monthly_report
        WHERE report_month = @last_month
        ORDER BY total_sign_ins DESC, continuous_days DESC
    ) ranked ON msr.report_id = ranked.report_id
    SET msr.rank = ranked.new_rank;
    
    -- 为月度签到前三名的用户发放额外奖励
    INSERT INTO user_points_log (user_id, points_change, points_type, current_total, current_available, description, reference_id)
    SELECT 
        msr.user_id,
        CASE msr.rank
            WHEN 1 THEN 500
            WHEN 2 THEN 300
            WHEN 3 THEN 200
            ELSE 0
        END as points_change,
        'SIGN_IN' as points_type,
        up.total_points + CASE msr.rank
            WHEN 1 THEN 500
            WHEN 2 THEN 300
            WHEN 3 THEN 200
            ELSE 0
        END as current_total,
        up.available_points + CASE msr.rank
            WHEN 1 THEN 500
            WHEN 2 THEN 300
            WHEN 3 THEN 200
            ELSE 0
        END as current_available,
        CASE msr.rank
            WHEN 1 THEN '月度签到冠军奖励'
            WHEN 2 THEN '月度签到亚军奖励'
            WHEN 3 THEN '月度签到季军奖励'
            ELSE ''
        END as description,
        CONCAT('monthly_rank_', msr.rank, '_', @last_month) as reference_id
    FROM sign_in_monthly_report msr
    JOIN user_points up ON msr.user_id = up.user_id
    WHERE msr.report_month = @last_month
    AND msr.rank IN (1, 2, 3)
    AND NOT EXISTS (
        SELECT 1 FROM user_points_log upl
        WHERE upl.user_id = msr.user_id
        AND upl.description = CASE msr.rank
            WHEN 1 THEN '月度签到冠军奖励'
            WHEN 2 THEN '月度签到亚军奖励'
            WHEN 3 THEN '月度签到季军奖励'
            ELSE ''
        END
        AND upl.reference_id = CONCAT('monthly_rank_', msr.rank, '_', @last_month)
    );
    
    -- 更新用户积分表
    UPDATE user_points up
    JOIN (
        SELECT 
            msr.user_id,
            CASE msr.rank
                WHEN 1 THEN 500
                WHEN 2 THEN 300
                WHEN 3 THEN 200
                ELSE 0
            END as points_change
        FROM sign_in_monthly_report msr
        WHERE msr.report_month = @last_month
        AND msr.rank IN (1, 2, 3)
        AND NOT EXISTS (
            SELECT 1 FROM user_points_log upl
            WHERE upl.user_id = msr.user_id
            AND upl.description = CASE msr.rank
                WHEN 1 THEN '月度签到冠军奖励'
                WHEN 2 THEN '月度签到亚军奖励'
                WHEN 3 THEN '月度签到季军奖励'
                ELSE ''
            END
            AND upl.reference_id = CONCAT('monthly_rank_', msr.rank, '_', @last_month)
        )
    ) rewards ON up.user_id = rewards.user_id
    SET 
        up.total_points = up.total_points + rewards.points_change,
        up.available_points = up.available_points + rewards.points_change,
        up.updated_at = NOW();
    
    -- 清理过期数据(保留最近12个月的报告)
    DELETE FROM sign_in_monthly_report
    WHERE report_month < DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 12 MONTH), '%Y-%m');
END //
DELIMITER ;






















-- ============================================
-- 初始化数据
-- ============================================

-- VIP会员配置
INSERT INTO `vip_level_config` 
(`vip_level`, `level_name`, `min_points`, `max_points`, `icon_url`, `badge_color`, `daily_points_limit`, `monthly_points_limit`, `benefits_json`, `status`) 
VALUES
-- VIP0: 普通用户
(0, '普通会员', 0, 99, NULL, '#808080', 50, 300, 
 '{"discount": 0, "free_shipping": false, "birthday_gift": false, "priority_service": false, "exclusive_content": false}', 1),
-- VIP1: 青铜会员
(1, '青铜会员', 100, 499, '/icons/vip1.png', '#CD7F32', 80, 500, 
 '{"discount": 5, "free_shipping": false, "birthday_gift": true, "priority_service": false, "exclusive_content": false}', 1),
-- VIP2: 白银会员
(2, '白银会员', 500, 1499, '/icons/vip2.png', '#C0C0C0', 120, 800, 
 '{"discount": 8, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": false}', 1),
-- VIP3: 黄金会员
(3, '黄金会员', 1500, 2999, '/icons/vip3.png', '#FFD700', 150, 1200, 
 '{"discount": 10, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true}', 1),
-- VIP4: 铂金会员
(4, '铂金会员', 3000, 4999, '/icons/vip4.png', '#E5E4E2', 200, 1500, 
 '{"discount": 12, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true}', 1),
-- VIP5: 钻石会员
(5, '钻石会员', 5000, 9999, '/icons/vip5.png', '#B9F2FF', 300, 2000, 
 '{"discount": 15, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true, "personal_manager": true}', 1),
-- VIP6: 至尊会员
(6, '至尊会员', 10000, 19999, '/icons/vip6.png', '#FF0000', 500, 3000, 
 '{"discount": 18, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true, "personal_manager": true, "invitation_privilege": true}', 1),
-- VIP7: 黑金会员
(7, '黑金会员', 20000, 49999, '/icons/vip7.png', '#000000', 800, 5000, 
 '{"discount": 20, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true, "personal_manager": true, "invitation_privilege": true, "exclusive_events": true}', 1),
-- VIP8: 王者会员
(8, '王者会员', 50000, 99999, '/icons/vip8.png', '#800080', 1000, 8000, 
 '{"discount": 25, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true, "personal_manager": true, "invitation_privilege": true, "exclusive_events": true, "customized_service": true}', 1),
-- VIP9: 终身荣誉会员
(9, '终身荣誉会员', 100000, NULL, '/icons/vip9.png', '#FF4500', 1500, 10000, 
 '{"discount": 30, "free_shipping": true, "birthday_gift": true, "priority_service": true, "exclusive_content": true, "monthly_coupon": true, "annual_gift": true, "personal_manager": true, "invitation_privilege": true, "exclusive_events": true, "customized_service": true, "lifetime_privilege": true}', 1);
 
--  成长值获取规则
INSERT INTO `vip_points_rules` 
(`rule_code`, `rule_name`, `points_value`, `points_type`, `max_times_per_day`, `max_times_total`, `require_vip_level`, `cooldown_seconds`, `description`, `status`) 
VALUES
-- 每日任务类
('DAILY_LOGIN', '每日登录', 10, 'DAILY', 1, NULL, 0, 0, '每日首次登录获得成长值', 1),
('DAILY_CHECKIN', '每日签到', 5, 'DAILY', 1, NULL, 0, 0, '每日签到获得成长值', 1),
-- 消费类
('PURCHASE_AMOUNT', '消费金额', 1, 'EVERYTIME', NULL, NULL, 0, 0, '每消费1元获得1成长值', 1),
('FIRST_PURCHASE', '首次消费', 100, 'ONCE', NULL, 1, 0, 0, '首次消费额外奖励', 1),
('MONTHLY_FIRST_PURCHASE', '月度首消', 50, 'DAILY', 1, NULL, 1, 0, '每月首次消费额外奖励', 1),
-- 充值类
('RECHARGE_AMOUNT', '充值金额', 2, 'EVERYTIME', NULL, NULL, 0, 0, '每充值1元获得2成长值', 1),
('FIRST_RECHARGE', '首次充值', 200, 'ONCE', NULL, 1, 0, 0, '首次充值额外奖励', 1),
('LARGE_RECHARGE', '大额充值', 500, 'EVERYTIME', NULL, NULL, 2, 86400, '单笔充值满500元额外奖励', 1),
-- 活跃类
('COMPLETE_PROFILE', '完善资料', 50, 'ONCE', NULL, 1, 0, 0, '完善个人资料获得成长值', 1),
('UPLOAD_AVATAR', '上传头像', 20, 'ONCE', NULL, 1, 0, 0, '上传个人头像获得成长值', 1),
('INVITE_FRIEND', '邀请好友', 100, 'EVERYTIME', 10, NULL, 0, 0, '每成功邀请1位好友获得成长值', 1),
('FRIEND_PURCHASE', '好友消费', 50, 'EVERYTIME', 20, NULL, 2, 0, '好友首次消费获得奖励', 1),
-- 内容类
('PUBLISH_CONTENT', '发布内容', 5, 'DAILY', 5, NULL, 0, 3600, '发布优质内容获得成长值', 1),
('CONTENT_LIKES', '内容获赞', 2, 'DAILY', 50, NULL, 0, 0, '内容每获得1个赞获得成长值', 1),
('COMMENT_ACTIVE', '积极评论', 2, 'DAILY', 10, NULL, 0, 600, '每日评论获得成长值', 1),
-- 活动类
('COMPLETE_TASK', '完成任务', 30, 'DAILY', 5, NULL, 0, 0, '完成日常任务获得成长值', 1),
('PARTICIPATE_EVENT', '参与活动', 100, 'EVERYTIME', NULL, NULL, 1, 0, '参与官方活动获得成长值', 1),
('WIN_CONTEST', '比赛获奖', 500, 'EVERYTIME', NULL, NULL, 0, 0, '在比赛中获奖获得成长值', 1),
-- 特权类
('BIRTHDAY_GIFT', '生日礼包', 200, 'DAILY', 1, NULL, 1, 86400, '生日礼包领取成长值', 1),
-- VIP特权类
('VIP_MONTHLY_GIFT', '月度礼包', 200, 'DAILY', 1, NULL, 3, 0, 'VIP月度礼包领取成长值', 1),
('VIP_BIRTHDAY_GIFT', '生日礼包', 500, 'DAILY', 1, NULL, 1, 86400, 'VIP生日礼包领取成长值', 1),
('VIP_ANNIVERSARY', '周年礼包', 1000, 'DAILY', 1, NULL, 5, 86400, 'VIP周年纪念礼包', 1);

-- 用户角色
INSERT INTO `user_roles` 
(`role_name`, `role_code`, `role_description`, `is_system_role`, `is_default`, `sort_order`, `status`) 
VALUES
('系统管理员', 'ADMIN', '拥有系统最高权限, 可以管理所有功能', 1, 0, 100, 1),
('超级会员', 'SUPER_VIP', '拥有高级会员特权', 0, 0, 90, 1),
('普通会员', 'MEMBER', '注册用户基础角色', 0, 1, 80, 1),
('内容创作者', 'CONTENT_CREATOR', '可以发布和管理自己的内容', 0, 0, 70, 1),
('内容审核员', 'CONTENT_MODERATOR', '可以审核用户发布的内容', 0, 0, 60, 1),
('客服专员', 'CUSTOMER_SERVICE', '处理用户反馈和问题', 0, 0, 50, 1),
('运营专员', 'OPERATION_STAFF', '负责日常运营活动', 0, 0, 40, 1),
('访客', 'GUEST', '未登录用户角色', 1, 0, 10, 1),
('封禁用户', 'BANNED_USER', '被限制使用的用户', 1, 0, 0, 1);

-- 用户资源
INSERT INTO `user_resources` 
(`resource_name`, `resource_code`, `resource_description`, `resource_category`, 
 `resource_path`, `resource_component`, `resource_icon`, `parent_id`, `level`, 
 `sort_order`, `is_system`, `permission_flag`, `requires_auth`, `keep_alive`, 
 `external_link`, `target`, `meta_json`) 
VALUES
-- 一级目录
('系统管理', 'system:management', '系统管理目录', 'CATALOG', '/system', NULL, 'el-icon-setting', NULL, 1, 100, 1, 'system:*', 1, NULL, 0, '_self', '{"hideInMenu": false}'),
('用户中心', 'user:center', '用户中心目录', 'CATALOG', '/user', NULL, 'el-icon-user', NULL, 1, 90, 1, 'user:*', 1, NULL, 0, '_self', NULL),
('内容管理', 'content:management', '内容管理目录', 'CATALOG', '/content', NULL, 'el-icon-document', NULL, 1, 80, 1, 'content:*', 1, NULL, 0, '_self', NULL),
('VIP中心', 'vip:center', 'VIP中心目录', 'CATALOG', '/vip', NULL, 'el-icon-star-off', NULL, 1, 70, 1, 'vip:*', 1, NULL, 0, '_self', NULL),

-- 系统管理下的菜单
('用户管理', 'system:user:management', '用户管理菜单', 'MENU', '/system/user', '/system/user/index', 'el-icon-user-solid', 1, 2, 101, 1, 'system:user:view', 1, 1, 0, '_self', NULL),
('角色管理', 'system:role:management', '角色管理菜单', 'MENU', '/system/role', '/system/role/index', 'el-icon-s-custom', 1, 2, 102, 1, 'system:role:view', 1, 1, 0, '_self', NULL),
('资源管理', 'system:resource:management', '资源管理菜单', 'MENU', '/system/resource', '/system/resource/index', 'el-icon-menu', 1, 2, 103, 1, 'system:resource:view', 1, 1, 0, '_self', NULL),
('系统配置', 'system:config:management', '系统配置菜单', 'MENU', '/system/config', '/system/config/index', 'el-icon-setting', 1, 2, 104, 1, 'system:config:view', 1, 1, 0, '_self', NULL),

-- API接口资源
('获取用户列表', 'api:user:list', '获取用户列表接口', 'API', '/api/users/list', NULL, NULL, NULL, 1, 0, 1, 'api:user:list', 1, NULL, 0, '_self', NULL),
('创建用户', 'api:user:register', '创建用户接口', 'API', '/api/users/register', NULL, NULL, NULL, 1, 0, 1, 'api:user:register', 1, NULL, 0, '_self', NULL),
('更新用户', 'api:user:update', '更新用户接口', 'API', '/api/users/update/:id', NULL, NULL, NULL, 1, 0, 1, 'api:user:update', 1, NULL, 0, '_self', NULL),
('删除用户', 'api:user:logout', '删除用户接口', 'API', '/api/users/logout/:id', NULL, NULL, NULL, 1, 0, 1, 'api:user:logout', 1, NULL, 0, '_self', NULL),

-- 按钮权限
('新增用户按钮', 'button:user:add', '新增用户按钮权限', 'BUTTON', NULL, NULL, NULL, 2, 2, 0, 1, 'button:user:add', 1, NULL, 0, '_self', NULL),
('编辑用户按钮', 'button:user:edit', '编辑用户按钮权限', 'BUTTON', NULL, NULL, NULL, 2, 2, 0, 1, 'button:user:edit', 1, NULL, 0, '_self', NULL),
('删除用户按钮', 'button:user:delete', '删除用户按钮权限', 'BUTTON', NULL, NULL, NULL, 2, 2, 0, 1, 'button:user:delete', 1, NULL, 0, '_self', NULL),

-- 用户中心菜单
('个人资料', 'user:profile', '个人资料页面', 'PAGE', '/user/profile', '/user/profile/index', 'el-icon-user', 2, 2, 91, 1, 'user:profile:view', 1, 1, 0, '_self', NULL),
('安全设置', 'user:security', '安全设置页面', 'PAGE', '/user/security', '/user/security/index', 'el-icon-lock', 2, 2, 92, 1, 'user:security:view', 1, 1, 0, '_self', NULL),
('我的积分', 'user:points', '我的积分页面', 'PAGE', '/user/points', '/user/points/index', 'el-icon-coin', 2, 2, 93, 1, 'user:points:view', 1, 1, 0, '_self', NULL);

-- 用户数据
INSERT INTO `users` (`username`, `password_hash`, `account_status`) VALUES
('admin', '$2a$10$Cd.PLf6i31M/82O8lYdamO.iw0otqcIRSNhZpKqFtWsq9Qm2CFpWi', 1),
('xiaomizha', '$2a$10$cGuunhhp4miKUYpLYwiEpe0P1/btzgJVCJUrLKE6wT9GOa10MmpOS', 1),
('xuyou', '$2a$10$3uwzr8c/bYXW0niWdtQtSOXA/2RnD7Ii5vvNbzckUf6qZ4pBOK/ky', 1),
('xuyour', '$2a$10$6el95PitXraB9WRF9tILMentdUHiFS4RiyKafJG5pbH8w71KlK.QG', 1),
('xuyouer', '$2a$10$eSEIBK4u.WXtqwB7RAWj9Of52Xc5WiWv.e7yYr4XFwWMpM3zWlxeO', 1),
('江底溺水的鱼', '$2a$10$52RfIsyxGaKu2K0GYywlxu1TSGKrOTz/4KsJaZgyK5.ENbigSBy5.', 1),
('生不如死', '$2a$10$eUetrCK.kNBVaqWuRpveZOarP0MgSCJ0d9QVBaamB1TlVYIEF.b8K', 1),
('有所期待', '$2a$10$jM3hBqITmROp9wE6LtL0puhWJ9NOTD2icBLnIDaLYBiwlLOQD8lii', 1),
('小咪楂', '$2a$10$dYSIGra8yCaMIBs.8W0aPeCUdhrnZ48DoFzyFOaqtd8ip1HMLqkgS', 1),
('许柚', '$2a$10$gCY1WhWtly3..3osGzA1u.FIciafzutz.I0ZYD7w7222VzCtK5be6', 1),
('天台自由的鸟', '$2a$10$X4vnUd8ZvEbgJncI8Wh9H./Hx2ZOhsAG/Vlv96WmRnKjcbt2JIVVO', 1),
('example', '$2a$10$A3oOx4oAnkLRmzKzgTnWRumcINLD0yTcBYJEHua.7XpqSfWJDeMyy', 1);

-- 用户名信息
INSERT INTO `user_names` (`user_id`, `create_name`, `display_name`, `is_default_display`) VALUES
(10000, 'xmzid_epsrkk28cu96ugt7', '管理员', 1),
(10001, 'xmzid_qh7zn8gpke6afn73', '江底溺水的鱼', 1),
(10002, 'xmzid_7cf5ba582n93hz6d', '江底溺水的鱼', 1),
(10003, 'xmzid_32n2qn7bayg3p4v2', '江底溺水的鱼', 1),
(10004, 'xmzid_gf23g56vqkyed3v6', '江底溺水的鱼', 1),
(10005, 'xmzid_n9xjjty8k7q2af73', '江底溺水的鱼', 1),
(10006, 'xmzid_utmpky45yf6t6h7j', '江底溺水的鱼', 1),
(10007, 'xmzid_6zc32f86pef9ve86', '江底溺水的鱼', 1),
(10008, 'xmzid_1151778e765f4b52', '江底溺水的鱼', 1),
(10009, 'xmzid_693d6917408d4f3c', '江底溺水的鱼', 1),
(10010, 'xmzid_a005f8be47cb425e', '江底溺水的鱼', 1),
(10011, 'xmzid_7d719fb8f8fa4ef5', 'Example', 1);

-- 用户角色
INSERT INTO `user_role_relations` 
(`user_id`, `role_id`, `assigned_by`, `is_primary`, `status`) 
VALUES
-- 管理员角色
(10000, 1, 10000, 1, 'ACTIVE'),
-- 超级会员角色
(10001, 2, NULL, 1, 'ACTIVE'),
(10000, 2, NULL, 0, 'ACTIVE'),
-- 普通会员角色(默认角色)
(10002, 3, NULL, 1, 'ACTIVE'),
(10003, 3, NULL, 1, 'ACTIVE'),
(10004, 3, NULL, 1, 'ACTIVE'),
(10005, 3, NULL, 1, 'ACTIVE'),
(10006, 3, NULL, 1, 'ACTIVE'),
(10007, 3, NULL, 1, 'ACTIVE'),
(10008, 3, NULL, 1, 'ACTIVE'),
(10009, 3, NULL, 1, 'ACTIVE'),
(10010, 3, NULL, 1, 'ACTIVE'),
(10011, 3, NULL, 1, 'ACTIVE'),
-- 内容创作者角色
(10001, 4, NULL, 0, 'ACTIVE'),
-- 客服专员角色
(10001, 6, 10000, 0, 'ACTIVE');

-- 管理员角色分配所有权限
INSERT INTO `role_resource_relations` 
(`role_id`, `resource_id`, `permission_type`, `is_inheritable`, `priority`, `granted_by`) 
SELECT 
    1 as role_id,  -- 管理员角色
    resource_id,
    'ALL' as permission_type,
    1 as is_inheritable,
    99 as priority,
    10000 as granted_by  -- 系统管理员用户ID
FROM user_resources 
WHERE status = 1 AND deleted_at IS NULL;

INSERT INTO `role_resource_relations` 
(`role_id`, `resource_id`, `permission_type`, `granted_by`) VALUES
(3, 16, 'ALL', 10000),
(3, 17, 'ALL', 10000),
(3, 18, 'ALL', 10000),
(8, 16, 'READ', 10000),
(8, 17, 'READ', 10000),
(8, 18, 'READ', 10000);

-- 用户详细资料
INSERT INTO `user_profiles` (`user_id`, `nickname`, `email`,`gender`, `bio`) VALUES
(10000, '管理员', 'admin@example.com', 'UNKNOWN', '系统管理员'),
(10001, '江底溺水的鱼', 'xiaomizha@example.com', 'UNKNOWN', '热爱编程的开发者'),
(10002, '江底溺水的鱼', 'xuyou@example.com', 'UNKNOWN', NULL),
(10003, '江底溺水的鱼', 'xuyour@example.com', 'UNKNOWN', NULL),
(10004, '江底溺水的鱼', 'xuyouer@example.com', 'UNKNOWN', NULL),
(10005, '江底溺水的鱼', 'user6@example.com', 'UNKNOWN', NULL),
(10006, '江底溺水的鱼', 'user7@example.com', 'UNKNOWN', NULL),
(10007, '江底溺水的鱼', 'user8@example.com', 'UNKNOWN', NULL),
(10008, '江底溺水的鱼', 'user9@example.com', 'UNKNOWN', NULL),
(10009, '江底溺水的鱼', 'user10@example.com', 'UNKNOWN', NULL),
(10010, '江底溺水的鱼', 'user11@example.com', 'UNKNOWN', NULL),
(10011, 'Example', 'example@example.com', 'UNKNOWN', '示例用户');

-- 用户积分
INSERT INTO `user_points` (`user_id`, `total_points`, `available_points`, `frozen_points`, `consumed_points`) VALUES
(10000, 1000, 1000, 0, 0),
(10001, 5000, 5000, 0, 0),
(10002, 100, 100, 0, 0),
(10003, 100, 100, 0, 0),
(10004, 100, 100, 0, 0),
(10005, 100, 100, 0, 0),
(10006, 100, 100, 0, 0),
(10007, 100, 100, 0, 0),
(10008, 100, 100, 0, 0),
(10009, 100, 100, 0, 0),
(10010, 100, 100, 0, 0),
(10011, 100, 100, 0, 0);

-- 用户会员信息
INSERT INTO `user_vip_info` 
(`user_id`, `vip_level`, `vip_points`, `next_level_required`, `total_earned_points`, 
 `vip_status`, `vip_upgrade_date`, `vip_expire_date`, `level_expire_date`,
 `total_recharge_amount`, `last_recharge_date`, `last_recharge_amount`) 
VALUES
(10000, 3, 1500, 3000, 1500, 
 'ACTIVE', NOW(), DATE_ADD(NOW(), INTERVAL 365 DAY), DATE_ADD(NOW(), INTERVAL 180 DAY),
 1000.00, NOW(), 500.00),
(10001, 2, 800, 1500, 800,
 'ACTIVE', NOW(), DATE_ADD(NOW(), INTERVAL 180 DAY), DATE_ADD(NOW(), INTERVAL 90 DAY),
 500.00, NOW(), 200.00),
(10002, 0, 50, 100, 50,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10003, 0, 30, 100, 30,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10004, 0, 20, 100, 20,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10005, 0, 10, 100, 10,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10006, 0, 5, 100, 5,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10007, 0, 5, 100, 5,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10008, 0, 5, 100, 5,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10009, 0, 5, 100, 5,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10010, 0, 5, 100, 5,
 'INACTIVE', NULL, NULL, NULL,
 0.00, NULL, 0.00),
(10011, 1, 200, 500, 200,
 'ACTIVE', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 30 DAY),
 100.00, NOW(), 100.00);
 
-- 初始化next_level_required字段
-- CALL sp_update_all_next_level_required();

-- 登录记录
-- INSERT INTO `user_login_records` (`user_id`, `ip_address`, `user_agent`, `device_info`, `login_type`, `login_status`, `failure_reason`, `created_at`) VALUES
-- (10000, '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Windows PC', 'LOGIN', 1, NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
-- (10001, '192.168.1.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'iPhone 12', 'LOGIN', 1, NULL, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
-- (10001, '192.168.1.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'iPhone 12', 'AUTO_LOGIN', 1, NULL, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
-- (10002, '192.168.1.3', 'Mozilla/5.0 (Android 11; Mobile) AppleWebKit/537.36', 'Android Phone', 'LOGIN', 1, NULL, DATE_SUB(NOW(), INTERVAL 5 HOUR)),
-- (10007, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Windows PC', 'LOGIN', 0, '密码错误', DATE_SUB(NOW(), INTERVAL 30 MINUTE)),
-- (10007, '192.168.1.10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Windows PC', 'LOGIN', 1, NULL, DATE_SUB(NOW(), INTERVAL 25 MINUTE));

-- 用户日志
INSERT INTO `user_logs` (`user_id`, `level`, `action`, `ip_address`, `user_agent`, `device_info`, `details`, `status`, `created_at`, `updated_at`) VALUES
(10000, 'INFO', 'LOGIN', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Windows PC', '管理员登录系统', 1, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY)),
(10001, 'INFO', 'LOGIN', '192.168.1.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'iPhone 12', '用户登录系统', 1, DATE_SUB(NOW(), INTERVAL 2 HOUR), DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(10001, 'INFO', 'UPDATE_PROFILE', '192.168.1.2', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15', 'iPhone 12', '更新用户资料: 修改昵称', 1, DATE_SUB(NOW(), INTERVAL 1 HOUR), DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(10000, 'INFO', 'USER_MANAGEMENT', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 'Windows PC', '管理员修改用户权限', 1, DATE_SUB(NOW(), INTERVAL 3 HOUR), DATE_SUB(NOW(), INTERVAL 3 HOUR));

-- 积分变更记录
INSERT INTO `user_points_log` (`user_id`, `points_change`, `points_type`, `current_total`, `current_available`, `description`, `reference_id`, `operator_id`, `created_at`) VALUES
(10000, 1000, 'ADMIN_ADJUST', 1000, 1000, '管理员初始积分', 'INIT_10000', 10000, NOW()),
(10001, 5000, 'PURCHASE', 5000, 5000, '购买VIP获得积分', 'ORDER_2023001', NULL, NOW()),
(10001, -500, 'CONSUME', 4500, 4500, '兑换礼品', 'GIFT_001', NULL, DATE_SUB(NOW(), INTERVAL 1 DAY)),
(10002, 100, 'SIGN_IN', 100, 100, '每日签到获得积分', 'SIGN_20231001', NULL, NOW()),
(10007, 100, 'TASK', 100, 100, '完成任务获得积分', 'TASK_001', NULL, NOW());

-- VIP变更记录
INSERT INTO `user_vip_log` (`user_id`, `old_vip_level`, `new_vip_level`, `old_vip_points`, `new_vip_points`, `change_type`, `change_reason`, `operator_id`, `created_at`) VALUES
(10000, 0, 1, 0, 500, 'UPGRADE', '首次充值升级VIP', NULL, DATE_SUB(NOW(), INTERVAL 30 DAY)),
(10000, 1, 2, 500, 1000, 'UPGRADE', '累计充值升级VIP', NULL, DATE_SUB(NOW(), INTERVAL 15 DAY)),
(10000, 2, 3, 1000, 1500, 'UPGRADE', '大额充值升级VIP', NULL, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(10001, 0, 1, 0, 300, 'UPGRADE', '购买月度VIP', NULL, DATE_SUB(NOW(), INTERVAL 20 DAY)),
(10001, 1, 2, 300, 800, 'UPGRADE', '续费升级VIP', NULL, DATE_SUB(NOW(), INTERVAL 5 DAY)),
(10007, 0, 1, 0, 200, 'UPGRADE', '新用户首次充值', NULL, DATE_SUB(NOW(), INTERVAL 3 DAY));

-- 系统配置
INSERT INTO `system_configs` (`config_key`, `config_value`, `config_type`, `description`, `is_public`) VALUES
('system_name', '小咪楂', 'string', '系统名', TRUE),
('system_version', '1.0.0', 'string', '系统版本号', TRUE),
('copyright_year', '2020', 'string', '版权年份', TRUE),
('company_name', 'XIAOMIZHA, Ltd.', 'string', '公司名称', TRUE),
('contact_email', 'xiaomizha@example.com', 'string', '联系邮箱', TRUE),
('contact_phone', 'XXX-XXXX-XXXX', 'string', '联系电话', TRUE),
('site_url', 'https://xiaomizha.ltd', 'string', '网站地址', TRUE),
('site_icp', '京ICP备12345678号', 'string', '备案信息', TRUE),
('system_timezone', 'Asia/Shanghai', 'string', '系统时区', FALSE),
('default_language', 'zh-CN', 'string', '默认语言', FALSE),
('maintenance_mode', 'false', 'boolean', '维护模式开关', FALSE),

('allow_registration', 'true', 'boolean', '允许注册开关', TRUE),
('allow_update_username', 'false', 'boolean', '允许更新登录名开关', TRUE),

-- 用户相关配置
('user_default_status', '1', 'number', '用户默认状态(1正常/0禁用)', FALSE),
('user_session_timeout', '7200', 'number', '用户会话超时时间(秒)', FALSE),
('user_max_login_attempts', '5', 'number', '最大登录尝试次数', FALSE),
('user_login_lock_time', '1800', 'number', '登录锁定时间(秒)', FALSE),
('user_password_min_length', '8', 'number', '密码最小长度', TRUE),
('user_password_require_complexity', 'true', 'boolean', '密码要求复杂度', TRUE),
('user_avatar_max_size', '2097152', 'number', '头像最大大小(字节)', TRUE),
('user_avatar_allowed_types', '["jpg", "jpeg", "png", "gif"]', 'json', '允许的头像文件类型', TRUE),
('user_nickname_max_length', '20', 'number', '昵称最大长度', TRUE),
('user_bio_max_length', '200', 'number', '个人简介最大长度', TRUE),

-- 积分系统配置
('points_sign_in_daily', '10', 'number', '每日签到积分', TRUE),
('points_sign_in_continuous_7', '30', 'number', '连续签到7天额外积分', TRUE),
('points_sign_in_continuous_15', '50', 'number', '连续签到15天额外积分', TRUE),
('points_sign_in_continuous_30', '100', 'number', '连续签到30天额外积分', TRUE),
('points_first_login', '50', 'number', '首次登录奖励积分', FALSE),
('points_complete_profile', '100', 'number', '完善资料奖励积分', TRUE),
('points_invite_friend', '200', 'number', '邀请好友奖励积分', TRUE),
('points_purchase_rate', '1', 'number', '消费积分比率(每1元)', TRUE),
('points_recharge_rate', '2', 'number', '充值积分比率(每1元)', TRUE),
('points_min_consume', '100', 'number', '积分最小消费单位', TRUE),
('points_expire_days', '365', 'number', '积分过期天数(0为永不过期)', TRUE),
('points_adjust_min_value', '-10000', 'number', '单次积分调整最小值', FALSE),
('points_adjust_max_value', '10000', 'number', '单次积分调整最大值', FALSE),
('points_daily_adjust_limit', '5000', 'number', '每日积分调整上限(单用户)', FALSE),
('points_monthly_adjust_limit', '20000', 'number', '每月积分调整上限(单用户)', FALSE),
('points_require_admin_approval', 'false', 'boolean', '大额调整需要管理员审批', FALSE),
('points_approval_threshold', '1000', 'number', '需要审批的调整阈值', FALSE),
('points_adjust_log_retention', '365', 'number', '积分调整日志保留天数', FALSE),
('points_auto_cleanup_enabled', 'true', 'boolean', '启用积分自动清理(过期积分)', FALSE),
('points_cleanup_schedule', '0 3 * * *', 'string', '积分清理计划(cron表达式)', FALSE),
('points_expire_notification_days', '30', 'number', '积分过期提前通知天数', TRUE),

-- VIP系统配置
('vip_expire_warning_days', '7', 'number', 'VIP到期提前提醒天数', FALSE),
('vip_level_expire_warning_days', '7', 'number', '等级到期提前提醒天数', FALSE),
('vip_auto_downgrade_delay', '30', 'number', '过期后自动降级延迟天数', FALSE),
('vip_birthday_gift_points', '200', 'number', 'VIP生日礼包成长值', TRUE),
('vip_monthly_gift_points', '100', 'number', 'VIP月度礼包成长值', TRUE),
('vip_points_reset_daily_time', '00:00:00', 'string', '每日成长值重置时间', FALSE),
('vip_points_reset_monthly_day', '1', 'number', '每月成长值重置日期', FALSE),
('vip_upgrade_notification', 'true', 'boolean', '升级通知开关', TRUE),
('vip_expire_notification', 'true', 'boolean', '到期通知开关', TRUE),

-- 反馈系统配置
('feedback_enabled', 'true', 'boolean', '反馈功能开关', TRUE),
('feedback_require_login', 'true', 'boolean', '反馈需要登录', TRUE),
('feedback_min_content_length', '10', 'number', '反馈内容最小长度', TRUE),
('feedback_max_content_length', '2000', 'number', '反馈内容最大长度', TRUE),
('feedback_allow_attachments', 'true', 'boolean', '允许上传附件', TRUE),
('feedback_max_attachments', '3', 'number', '最大附件数量', TRUE),
('feedback_attachment_max_size', '10485760', 'number', '附件最大大小(字节)', TRUE),
('feedback_auto_reply_enabled', 'true', 'boolean', '自动回复开关', FALSE),
('feedback_auto_reply_content', '感谢您的反馈, 我们已经收到并会尽快处理。', 'string', '自动回复内容', FALSE),
('feedback_response_time_target', '48', 'number', '反馈响应时间目标(小时)', FALSE),
('feedback_priority_vip_level', '3', 'number', '高优先级VIP等级阈值', FALSE),
('feedback_auto_close_days', '90', 'number', '反馈自动关闭天数(未处理)', FALSE),
('feedback_response_target_hours', '72', 'number', '反馈响应目标时间(小时)', TRUE),
('feedback_resolution_target_days', '7', 'number', '反馈解决目标天数', TRUE),
('feedback_allow_anonymous', 'false', 'boolean', '允许匿名反馈', TRUE),
('feedback_max_per_user_per_day', '5', 'number', '每用户每日最大反馈次数', TRUE),
('feedback_spam_protection_enabled', 'true', 'boolean', '启用垃圾反馈防护', FALSE),
('feedback_duplicate_check_enabled', 'true', 'boolean', '启用重复反馈检查', FALSE),
('feedback_similarity_threshold', '80', 'number', '相似度阈值(百分比)', FALSE),
('feedback_auto_categorize_enabled', 'true', 'boolean', '启用自动分类', FALSE),
('feedback_sentiment_analysis_enabled', 'false', 'boolean', '启用情感分析', FALSE),

-- 安全相关配置
('security_enable_captcha', 'true', 'boolean', '启用验证码', TRUE),
('security_captcha_type', 'math', 'string', '验证码类型(math/text/image)', FALSE),
('security_enable_login_ip_check', 'true', 'boolean', '启用登录IP检查', FALSE),
('security_allowed_login_ips', '[]', 'json', '允许登录的IP列表(空数组为不限制)', FALSE),
('security_blocked_ips', '[]', 'json', '封禁的IP列表', FALSE),
('security_enable_two_factor', 'false', 'boolean', '启用双重验证', FALSE),
('security_require_email_verification', 'false', 'boolean', '要求邮箱验证', TRUE),
('security_require_phone_verification', 'false', 'boolean', '要求手机验证', TRUE),
('security_max_sessions_per_user', '5', 'number', '每个用户最大会话数', FALSE),
('security_password_reset_token_expiry', '1800', 'number', '密码重置令牌有效期(秒)', FALSE),

-- 系统性能配置
('performance_cache_enabled', 'true', 'boolean', '启用缓存', FALSE),
('performance_cache_ttl', '3600', 'number', '缓存默认有效期(秒)', FALSE),
('performance_query_timeout', '30', 'number', '查询超时时间(秒)', FALSE),
('performance_max_upload_size', '52428800', 'number', '最大上传文件大小(字节)', TRUE),
('performance_session_gc_probability', '1', 'number', '会话垃圾回收概率(1-100)', FALSE),
('performance_log_retention_days', '90', 'number', '日志保留天数', FALSE),
('performance_backup_enabled', 'true', 'boolean', '启用自动备份', FALSE),
('performance_backup_schedule', '0 2 * * *', 'string', '备份计划(cron表达式)', FALSE),
('performance_backup_retention_days', '30', 'number', '备份保留天数', FALSE),

-- 通知和消息配置
('notification_enabled', 'true', 'boolean', '启用通知', TRUE),
('notification_email_enabled', 'true', 'boolean', '启用邮件通知', FALSE),
('notification_sms_enabled', 'false', 'boolean', '启用短信通知', FALSE),
('notification_push_enabled', 'true', 'boolean', '启用推送通知', TRUE),
('notification_feedback_response', 'true', 'boolean', '反馈回复通知', TRUE),
('notification_vip_upgrade', 'true', 'boolean', 'VIP升级通知', TRUE),
('notification_vip_expire', 'true', 'boolean', 'VIP到期通知', TRUE),
('notification_points_change', 'true', 'boolean', '积分变动通知', TRUE),
('notification_system_announcement', 'true', 'boolean', '系统公告通知', TRUE),
('notification_promotion_news', 'true', 'boolean', '促销消息通知', TRUE),

-- 上传文件配置
('upload_avatar_path', '/uploads/avatars/', 'string', '头像上传路径', FALSE),
('upload_feedback_path', '/uploads/feedback/', 'string', '反馈附件上传路径', FALSE),
('upload_temp_path', '/uploads/temp/', 'string', '临时文件上传路径', FALSE),
('upload_allowed_image_types', '["jpg", "jpeg", "png", "gif", "bmp", "webp"]', 'json', '允许的图片类型', TRUE),
('upload_allowed_document_types', '["pdf", "doc", "docx", "xls", "xlsx", "txt"]', 'json', '允许的文档类型', TRUE),
('upload_max_image_size', '5242880', 'number', '图片最大大小(字节)', TRUE),
('upload_max_document_size', '10485760', 'number', '文档最大大小(字节)', TRUE),
('upload_image_quality', '85', 'number', '图片压缩质量(1-100)', FALSE),
('upload_image_resize_width', '800', 'number', '图片最大宽度(像素)', FALSE),
('upload_image_resize_height', '800', 'number', '图片最大高度(像素)', FALSE),

-- 业务逻辑配置
('business_vip_auto_upgrade', 'true', 'boolean', 'VIP自动升级开关', FALSE),
('business_points_auto_expire', 'true', 'boolean', '积分自动过期开关', TRUE),
('business_sign_in_continuous_reward', 'true', 'boolean', '连续签到奖励开关', TRUE),
('business_invite_friend_reward', 'true', 'boolean', '邀请好友奖励开关', TRUE),
('business_first_purchase_bonus', 'true', 'boolean', '首次购买奖励开关', TRUE),
('business_birthday_gift_enabled', 'true', 'boolean', '生日礼包开关', TRUE),
('business_monthly_gift_enabled', 'true', 'boolean', '月度礼包开关', TRUE),
('business_anniversary_gift_enabled', 'true', 'boolean', '周年礼包开关', TRUE),
('business_allow_points_transfer', 'false', 'boolean', '允许积分转让', FALSE),
('business_points_transfer_fee_rate', '0.1', 'number', '积分转让手续费率', TRUE),

-- 显示和界面配置
('display_date_format', 'Y-m-d', 'string', '日期显示格式', TRUE),
('display_time_format', 'H:i:s', 'string', '时间显示格式', TRUE),
('display_datetime_format', 'Y-m-d H:i:s', 'string', '日期时间显示格式', TRUE),
('display_timezone', 'Asia/Shanghai', 'string', '显示时区', TRUE),
('display_items_per_page', '20', 'number', '每页显示条数', TRUE),
('display_enable_pagination', 'true', 'boolean', '启用分页', TRUE),
('display_default_theme', 'light', 'string', '默认主题(light/dark)', TRUE),
('display_enable_theme_switch', 'true', 'boolean', '启用主题切换', TRUE),
('display_language_switch_enabled', 'true', 'boolean', '启用语言切换', TRUE),
('display_currency_symbol', '¥', 'string', '货币符号', TRUE),

-- 反馈类型配置(用于动态管理反馈类型)
('feedback_types', '[
    {"id": 1, "name": "系统问题", "description": "游戏玩法、规则、平衡性等问题", "icon": "gamepad", "color": "#ff6b6b", "priority": 1},
    {"id": 2, "name": "功能建议", "description": "新功能建议或现有功能改进", "icon": "lightbulb", "color": "#4ecdc4", "priority": 2},
    {"id": 3, "name": "BUG反馈", "description": "系统错误、程序缺陷等问题", "icon": "bug", "color": "#ffd166", "priority": 1},
    {"id": 4, "name": "其他", "description": "其他类型问题", "icon": "help", "color": "#6c757d", "priority": 3}
]', 'json', '反馈类型配置', TRUE),

-- VIP特权描述配置
('vip_benefits_descriptions', '[
    {"level": 1, "benefits": ["5%消费折扣", "生日礼包", "专属客服"]},
    {"level": 2, "benefits": ["8%消费折扣", "免费配送", "生日礼包", "优先服务"]},
    {"level": 3, "benefits": ["10%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券"]},
    {"level": 4, "benefits": ["12%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品"]},
    {"level": 5, "benefits": ["15%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品", "专属经理"]},
    {"level": 6, "benefits": ["18%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品", "专属经理", "邀请特权"]},
    {"level": 7, "benefits": ["20%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品", "专属经理", "邀请特权", "专属活动"]},
    {"level": 8, "benefits": ["25%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品", "专属经理", "邀请特权", "专属活动", "定制服务"]},
    {"level": 9, "benefits": ["30%消费折扣", "免费配送", "生日礼包", "优先服务", "专属内容", "月度优惠券", "年度礼品", "专属经理", "邀请特权", "专属活动", "定制服务", "终身特权"]}
]', 'json', 'VIP特权描述配置', TRUE),

-- 积分获取途径说明
('points_acquisition_methods', '[
    {"name": "每日签到", "points": "10-100", "frequency": "每天", "description": "连续签到可获得更多积分"},
    {"name": "完善资料", "points": "100", "frequency": "一次性", "description": "完善个人信息"},
    {"name": "消费返积分", "points": "1:1", "frequency": "每次消费", "description": "每消费1元获得1积分"},
    {"name": "充值返积分", "points": "2:1", "frequency": "每次充值", "description": "每充值1元获得2积分"},
    {"name": "邀请好友", "points": "200", "frequency": "每成功邀请", "description": "好友注册并完成首单"},
    {"name": "参与活动", "points": "50-500", "frequency": "每次活动", "description": "参与平台活动"},
    {"name": "内容创作", "points": "10-50", "frequency": "每次发布", "description": "发布优质内容获赞"}
]', 'json', '积分获取途径说明', TRUE)
;

-- 许可证数据
INSERT INTO `license_info` (
    `license_key`, `license_id`, `user_name`, `company_name`, `contact_email`, 
    `product_version`, `features`, `start_time`, `end_time`, `license_type`, 
    `max_concurrent_users`, `allow_offline`, `status`, `activation_code`, 
    `created_by`, `remarks`
) VALUES
-- 试用版许可证
('LIC-TRIAL-XIAOMIZHA-INFINITY', 'LID-20260222-1000', '江底溺水的鱼', '小咪楂', 'example@example.com',
 '1.0.0', '["basic_features", "trial_period"]', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'TRIAL',
 NULL, FALSE, 'ACTIVE', 'TRIAL-ACTIVATION-1000',
 'system', '30天试用版许可证'),

-- 试用版许可证
('LIC-TRIAL-2026-0001', 'LID-20260222-0001', '江底溺水的鱼', '小咪楂', 'zhangsan@example.com',
 '1.0.0', '["basic_features", "trial_period"]', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'TRIAL',
 5, FALSE, 'ACTIVE', 'TRIAL-ACTIVATION-0001',
 'system', '30天试用版许可证'),

-- 基础版许可证
('LIC-BASIC-2026-0001', 'LID-20260222-0002', '江底溺水的鱼', '小咪楂', 'lisi@example.com',
 '1.0.0', '["basic_features", "standard_support"]', NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 'BASIC',
 10, TRUE, 'ACTIVE', 'BASIC-ACTIVATION-0001',
 'system', '1年期基础版许可证'),

-- 高级版许可证
('LIC-PREMIUM-2026-0001', 'LID-20260222-0003', '江底溺水的鱼', '小咪楂', 'wangwu@example.com',
 '1.0.0', '["basic_features", "advanced_features", "premium_support", "api_access"]', NOW(), DATE_ADD(NOW(), INTERVAL 2 YEAR), 'PREMIUM',
 50, TRUE, 'ACTIVE', 'PREMIUM-ACTIVATION-0001',
 'system', '2年期高级版许可证'),

-- 企业版许可证
('LIC-ENTERPRISE-2026-0001', 'LID-20260222-0004', '江底溺水的鱼', '小咪楂', 'zhaoliu@example.com',
 '1.0.0', '["basic_features", "advanced_features", "enterprise_features", "247_support", "api_access", "custom_integration"]', NOW(), DATE_ADD(NOW(), INTERVAL 3 YEAR), 'ENTERPRISE',
 200, TRUE, 'ACTIVE', 'ENTERPRISE-ACTIVATION-0001',
 'system', '3年期企业版许可证'),

-- 待激活的许可证
('LIC-TRIAL-2026-0002', 'LID-20260222-0005', '江底溺水的鱼', '小咪楂', 'sunqi@example.com',
 '1.0.0', '["basic_features", "trial_period"]', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 'TRIAL',
 5, FALSE, 'INACTIVE', 'TRIAL-ACTIVATION-0002',
 'system', '待激活的试用版许可证'),

-- 已过期的许可证
('LIC-BASIC-2025-0001', 'LID-20250222-0001', '江底溺水的鱼', '小咪楂', 'zhouba@example.com',
 '1.0.0', '["basic_features", "standard_support"]', DATE_SUB(NOW(), INTERVAL 1 YEAR), DATE_SUB(NOW(), INTERVAL 1 DAY), 'BASIC',
 10, TRUE, 'EXPIRED', 'BASIC-ACTIVATION-2025-0001',
 'system', '已过期的基础版许可证')
 ;
 
-- 签到配置表
INSERT INTO `sign_in_config` (`continuous_days`, `points_reward`, `is_active`) VALUES
(1, 10, 1),
(7, 30, 1),
(15, 50, 1),
(30, 100, 1)
;




















-- -- ============================================
-- -- 数据表操作
-- -- ============================================
-- 
-- -- 删除表数据
-- -- 语法:TRUNCATE TABLE 数据表;
-- -- 语法:DELETE FROM 数据表;
-- DELETE FROM `user_login_records`;
-- DELETE FROM `user_logs`;
-- DELETE FROM `user_name_history`;
-- DELETE FROM `user_names`;
-- DELETE FROM `user_points`;
-- DELETE FROM `user_points_log`;
-- DELETE FROM `user_profiles`;
-- DELETE FROM `user_vip_info`;
-- DELETE FROM `user_vip_log`;
-- DELETE FROM `user_vip_points_log`;
-- DELETE FROM `users`;
-- DELETE FROM `vip_level_config`;
-- DELETE FROM `vip_points_rules`;
-- 
-- -- 禁用外键约束检查, 以便顺利删除有外键关联的表
-- SET FOREIGN_KEY_CHECKS = 0;
-- 
-- -- 按照依赖关系反向删除所有表
-- DROP TABLE IF EXISTS `user_vip_log`;
-- DROP TABLE IF EXISTS `user_points_log`;
-- DROP TABLE IF EXISTS `user_profiles`;
-- DROP TABLE IF EXISTS `user_logs`;
-- DROP TABLE IF EXISTS `user_vip_info`;
-- DROP TABLE IF EXISTS `user_points`;
-- DROP TABLE IF EXISTS `user_login_records`;
-- DROP TABLE IF EXISTS `user_name_history`;
-- DROP TABLE IF EXISTS `user_names`;
-- DROP TABLE IF EXISTS `user_vip_points_log`;
-- DROP TABLE IF EXISTS `users`;
-- DROP TABLE IF EXISTS `vip_level_config`;
-- DROP TABLE IF EXISTS `vip_points_rules`;
-- 
-- -- -- 获取所有表名并生成TRUNCATE语句
-- -- -- 然后手动执行生成的TRUNCATE语句
-- -- -- SELECT CONCAT('TRUNCATE TABLE `', TABLE_NAME, '`;') 
-- -- -- SELECT CONCAT('DELETE FROM `', TABLE_NAME, '`;') 
-- -- SELECT CONCAT('DROP TABLE IF EXISTS `', TABLE_NAME, '`;') 
-- -- FROM information_schema.TABLES 
-- -- WHERE TABLE_SCHEMA = 'xiaomizha'
-- -- AND TABLE_TYPE = 'BASE TABLE';
-- 
-- -- 重新启用外键约束检查
-- SET FOREIGN_KEY_CHECKS = 1;
-- 
-- -- 验证所有表已删除
-- SELECT 
--     TABLE_NAME,
--     TABLE_ROWS
-- FROM 
--     information_schema.TABLES 
-- WHERE 
--     TABLE_SCHEMA = 'xiaomizha'
-- ORDER BY 
--     TABLE_NAME;






















-- ============================================
-- 数据库维护和清理
-- ============================================

-- ============================================
-- 存储函数管理
-- ============================================

-- 查看所有存储过程和函数
-- SELECT 
--     ROUTINE_SCHEMA as database_name,
--     ROUTINE_NAME as routine_name,
--     ROUTINE_TYPE as routine_type,
--     CREATED as created,
--     LAST_ALTERED as last_altered
-- FROM information_schema.ROUTINES
-- WHERE ROUTINE_SCHEMA = 'xiaomizha'
-- ORDER BY ROUTINE_TYPE, ROUTINE_NAME;

-- ============================================
-- 清理脚本
-- ============================================

DELIMITER $$

-- 删除所有存储过程和函数
-- DROP PROCEDURE IF EXISTS `sp_drop_all_routines`;
CREATE PROCEDURE `sp_drop_all_routines`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE routine_name_var VARCHAR(255);
    DECLARE routine_type_var VARCHAR(255);
    DECLARE drop_sql LONGTEXT DEFAULT '';
    DECLARE cur CURSOR FOR 
        SELECT ROUTINE_NAME, ROUTINE_TYPE 
        FROM information_schema.ROUTINES 
        WHERE ROUTINE_SCHEMA = DATABASE();
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO routine_name_var, routine_type_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF routine_name_var IS NOT NULL THEN
            IF routine_type_var = 'PROCEDURE' THEN
--                 SET @sql = CONCAT('DROP PROCEDURE IF EXISTS `', routine_name_var, '`');
                SET drop_sql = CONCAT(drop_sql, 'DROP PROCEDURE IF EXISTS `', routine_name_var, '`;\n');
            ELSEIF routine_type_var = 'FUNCTION' THEN
--                 SET @sql = CONCAT('DROP FUNCTION IF EXISTS `', routine_name_var, '`');
                SET drop_sql = CONCAT(drop_sql, 'DROP FUNCTION IF EXISTS `', routine_name_var, '`;\n');
            END IF;
			
--             IF @sql IS NOT NULL THEN
--                 PREPARE stmt FROM @sql;
--                 EXECUTE stmt;
--                 DEALLOCATE PREPARE stmt;
--                 SET @sql = NULL;
--             END IF;
        END IF;
    END LOOP;
    
    CLOSE cur;
	
-- 	SELECT CONCAT('已删除所有存储过程和函数') as result;
    SELECT drop_sql AS '请复制以下SQL并执行';
END$$

-- 删除所有触发器
-- DROP PROCEDURE IF EXISTS `sp_drop_all_triggers`;
CREATE PROCEDURE `sp_drop_all_triggers`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE trigger_name_var VARCHAR(255);
    DECLARE cur CURSOR FOR 
        SELECT TRIGGER_NAME 
        FROM information_schema.TRIGGERS 
        WHERE TRIGGER_SCHEMA = DATABASE();
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO trigger_name_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
		
        IF trigger_name_var IS NOT NULL THEN
            SET @sql = CONCAT('DROP TRIGGER IF EXISTS `', trigger_name_var, '`');
            PREPARE stmt FROM @sql;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            SET @sql = NULL;
        END IF;
    END LOOP;
    
    CLOSE cur;
	
	SELECT CONCAT('已删除所有触发器') as result;
END$$

-- 删除所有事件
-- DROP PROCEDURE IF EXISTS `sp_drop_all_events`;
CREATE PROCEDURE `sp_drop_all_events`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE event_name_var VARCHAR(255);
    DECLARE cur CURSOR FOR 
        SELECT EVENT_NAME 
        FROM information_schema.EVENTS 
        WHERE EVENT_SCHEMA = DATABASE();
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO event_name_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF event_name_var IS NOT NULL THEN
            SET @sql = CONCAT('DROP EVENT IF EXISTS `', event_name_var, '`');
            PREPARE stmt FROM @sql;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            SET @sql = NULL;
        END IF;
    END LOOP;
    
    CLOSE cur;
	
	SELECT CONCAT('已删除所有事件') as result;
END$$

-- 删除所有视图
-- DROP PROCEDURE IF EXISTS `sp_drop_all_views`;
CREATE PROCEDURE `sp_drop_all_views`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE view_name_var VARCHAR(255);
    DECLARE cur CURSOR FOR 
        SELECT TABLE_NAME 
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'VIEW';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO view_name_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF view_name_var IS NOT NULL THEN
            SET @sql = CONCAT('DROP VIEW IF EXISTS `', view_name_var, '`');
            PREPARE stmt FROM @sql;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            SET @sql = NULL;
        END IF;
    END LOOP;
    
    CLOSE cur;
	
	SELECT CONCAT('已删除所有视图') as result;
END$$

-- 删除所有表
-- DROP PROCEDURE IF EXISTS `sp_drop_all_tables`;
CREATE PROCEDURE `sp_drop_all_tables`()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE table_name_var VARCHAR(255);
    DECLARE cur CURSOR FOR 
        SELECT TABLE_NAME 
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE';
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    -- 禁用外键检查
    SET FOREIGN_KEY_CHECKS = 0;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO table_name_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF table_name_var IS NOT NULL THEN
            SET @sql = CONCAT('DROP TABLE IF EXISTS `', table_name_var, '`');
            PREPARE stmt FROM @sql;
            EXECUTE stmt;
            DEALLOCATE PREPARE stmt;
            SET @sql = NULL;
        END IF;
    END LOOP;
    
    CLOSE cur;
    
    -- 重新启用外键检查
    SET FOREIGN_KEY_CHECKS = 1;
	
	SELECT CONCAT('已删除所有表') as result;
END$$

-- 彻底清理数据库(删除所有对象)
-- DROP PROCEDURE IF EXISTS `sp_clean_database`;
CREATE PROCEDURE `sp_clean_database`()
BEGIN
    DECLARE exit_handler INT DEFAULT 0;
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
--         SELECT CONCAT('清理过程中出现错误') as warning;
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
        @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SELECT CONCAT('清理过程中出现错误: ', @sqlstate, ' - ', @errno, ' - ', @text) as warning;
    END;
	
    -- 删除所有事件
    CALL sp_drop_all_events();
    
    -- 删除所有存储过程和函数
    CALL sp_drop_all_routines();
    
    -- 删除所有触发器
    CALL sp_drop_all_triggers();
    
    -- 删除所有视图
    CALL sp_drop_all_views();
    
    -- 删除所有表
    CALL sp_drop_all_tables();
    
    SELECT '数据库清理完成' as result;
END$$

DELIMITER ;

-- CALL sp_clean_database();












-- ============================================
-- 性能监控和维护查询
-- ============================================

-- 数据库表大小监控
CREATE VIEW `database_size_view` AS
SELECT 
    TABLE_NAME as 表名,
    ROUND((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) as '大小(MB)',
    TABLE_ROWS as 行数,
    AUTO_INCREMENT as 下一个ID,
    UPDATE_TIME as 最后更新时间
FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'xiaomizha'
ORDER BY (DATA_LENGTH + INDEX_LENGTH) DESC;

-- 索引使用情况分析
CREATE VIEW `index_usage_view` AS
SELECT 
    TABLE_NAME as 表名,
    INDEX_NAME as 索引名,
    GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) as 索引字段,
    COUNT(*) as 字段数量,
    INDEX_TYPE as 索引类型,
    CASE 
        WHEN NON_UNIQUE = 0 THEN '唯一索引'
        ELSE '普通索引'
    END as 索引类型描述
FROM information_schema.STATISTICS
WHERE TABLE_SCHEMA = 'xiaomizha'
GROUP BY TABLE_NAME, INDEX_NAME, INDEX_TYPE, NON_UNIQUE
ORDER BY TABLE_NAME, INDEX_NAME;

-- SELECT 
--     TABLE_NAME as 表名,
--     INDEX_NAME as 索引名,
--     COLUMN_NAME as 字段名,
--     SEQ_IN_INDEX as 顺序,
--     INDEX_TYPE as 索引类型
-- FROM information_schema.STATISTICS
-- WHERE TABLE_SCHEMA = 'xiaomizha'
-- ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- 表统计信息
CREATE VIEW `table_statistics_view` AS
SELECT 
    t.TABLE_NAME as 表名,
    t.TABLE_ROWS as 数据行数,
    t.DATA_LENGTH as 数据大小,
    t.INDEX_LENGTH as 索引大小,
    t.AUTO_INCREMENT as 自增值,
    t.TABLE_COLLATION as 字符集,
    t.ENGINE as 存储引擎,
    t.CREATE_TIME as 创建时间,
    t.UPDATE_TIME as 更新时间
FROM information_schema.TABLES t
WHERE t.TABLE_SCHEMA = 'xiaomizha'
ORDER BY t.TABLE_ROWS DESC;

-- 外键关系视图
CREATE VIEW `foreign_key_view` AS
SELECT
    tc.TABLE_NAME as 子表,
    kcu.COLUMN_NAME as 子表字段,
    tc.CONSTRAINT_NAME as 约束名,
    rc.UPDATE_RULE as 更新规则,
    rc.DELETE_RULE as 删除规则,
    rc.REFERENCED_TABLE_NAME as 父表,
    kcu.REFERENCED_COLUMN_NAME as 父表字段
FROM information_schema.TABLE_CONSTRAINTS tc
JOIN information_schema.KEY_COLUMN_USAGE kcu 
    ON tc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME 
    AND tc.TABLE_SCHEMA = kcu.TABLE_SCHEMA
JOIN information_schema.REFERENTIAL_CONSTRAINTS rc 
    ON tc.CONSTRAINT_NAME = rc.CONSTRAINT_NAME 
    AND tc.TABLE_SCHEMA = rc.CONSTRAINT_SCHEMA
WHERE tc.CONSTRAINT_TYPE = 'FOREIGN KEY' 
    AND tc.TABLE_SCHEMA = 'xiaomizha'
ORDER BY tc.TABLE_NAME, kcu.ORDINAL_POSITION;
















-- ============================================
-- 数据库查询
-- ============================================

-- -- 查询数据库中存在的表数量
-- SELECT COUNT(*) AS `表数量` FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'xiaomizha';
-- 
-- -- 返回数据表各种状态信息的结果集
-- SHOW TABLE STATUS LIKE '数据表名';
-- 
-- -- 查询最新AUTO_INCREMENT
-- SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '数据表名' AND table_schema = DATABASE();
-- 
-- -- 查询最新记录ID
-- SELECT MAX(`ID`) FROM `数据表名`;
-- 
-- -- 查询最新记录
-- SELECT * FROM `数据表名` ORDER BY `ID` DESC LIMIT 1;

DELIMITER $$

CREATE PROCEDURE `sp_get_system_info`()
BEGIN
    DECLARE v_table_count INT;
    DECLARE v_view_count INT;
    DECLARE v_procedure_count INT;
    DECLARE v_trigger_count INT;
    DECLARE v_event_count INT;
    DECLARE v_event_scheduler_status VARCHAR(20);
    DECLARE v_feedback_count INT;
    DECLARE v_pending_feedback_count INT;
    
    -- 获取表数量
    SELECT COUNT(*) INTO v_table_count
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = 'xiaomizha' AND TABLE_TYPE = 'BASE TABLE';
    
    -- 获取视图数量
    SELECT COUNT(*) INTO v_view_count
    FROM information_schema.TABLES 
    WHERE TABLE_SCHEMA = 'xiaomizha' AND TABLE_TYPE = 'VIEW';
    
    -- 获取存储过程数量
    SELECT COUNT(*) INTO v_procedure_count
    FROM information_schema.ROUTINES 
    WHERE ROUTINE_SCHEMA = 'xiaomizha' AND ROUTINE_TYPE = 'PROCEDURE';
    
    -- 获取触发器数量
    SELECT COUNT(*) INTO v_trigger_count
    FROM information_schema.TRIGGERS 
    WHERE TRIGGER_SCHEMA = 'xiaomizha';
    
    -- 获取事件数量
    SELECT COUNT(*) INTO v_event_count
    FROM information_schema.EVENTS 
    WHERE EVENT_SCHEMA = 'xiaomizha';
    
    -- 获取事件调度器状态
    SET v_event_scheduler_status = CASE 
        WHEN (SELECT @@GLOBAL.event_scheduler) = 'ON' THEN '已启用'
        ELSE '已禁用'
    END;
    
    -- 返回结果
    SELECT '数据库名称' as 项目, 'xiaomizha' as 值
    UNION ALL
    SELECT '数据库字符集', 'utf8mb4'
    UNION ALL
    SELECT '数据库排序规则', 'utf8mb4_unicode_ci'
    UNION ALL
    SELECT 'MySQL版本', VERSION()
    UNION ALL
    SELECT '事件调度器状态', v_event_scheduler_status
    UNION ALL
    SELECT '表数量', v_table_count
    UNION ALL
    SELECT '视图数量', v_view_count
    UNION ALL
    SELECT '存储过程数量', v_procedure_count
    UNION ALL
    SELECT '触发器数量', v_trigger_count
    UNION ALL
    SELECT '事件数量', v_event_count
    UNION ALL
    SELECT '用户反馈总数', v_feedback_count
    UNION ALL
    SELECT '待处理反馈数', v_pending_feedback_count
    UNION ALL
    SELECT '系统配置数量', (SELECT COUNT(*) FROM system_configs)
    UNION ALL
    SELECT 'VIP等级配置数量', (SELECT COUNT(*) FROM vip_level_config)
    UNION ALL
    SELECT '成长值规则数量', (SELECT COUNT(*) FROM vip_points_rules);
END$$

DELIMITER ;

DELIMITER $$

-- 获取表的下一个自增值
CREATE FUNCTION `fn_get_next_auto_increment`(p_table_name VARCHAR(64))
RETURNS INT
READS SQL DATA
BEGIN
    DECLARE v_next_id INT;
    
    SELECT AUTO_INCREMENT INTO v_next_id
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = p_table_name;
    
    RETURN IFNULL(v_next_id, 0);
END$$

-- 获取表的记录数量
CREATE FUNCTION `fn_get_table_row_count`(p_table_name VARCHAR(64))
RETURNS BIGINT
READS SQL DATA
BEGIN
    DECLARE v_row_count BIGINT;
    
    SELECT TABLE_ROWS INTO v_row_count
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = p_table_name;
    
    RETURN IFNULL(v_row_count, 0);
END$$

-- 检查表是否存在
CREATE FUNCTION `fn_table_exists`(p_table_name VARCHAR(64))
RETURNS TINYINT(1)
READS SQL DATA
BEGIN
    DECLARE v_exists INT;
    
    SELECT COUNT(*) INTO v_exists
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = p_table_name;
    
    RETURN v_exists > 0;
END$$

DELIMITER ;












-- ============================================
-- 系统初始化完成
-- ============================================

-- 显示系统初始化状态
-- SELECT '用户管理系统初始化完成' as 状态;
-- SELECT '数据库: xiaomizha' as 信息;
-- SELECT '字符集: utf8mb4' as 信息;
-- SELECT '排序规则: utf8mb4_unicode_ci' as 信息;

-- -- 显示创建的表数量
-- SELECT 
--     COUNT(*) as 数据表数量,
--     GROUP_CONCAT(TABLE_NAME) as 表名列表
-- FROM information_schema.TABLES 
-- WHERE TABLE_SCHEMA = 'xiaomizha' 
--   AND TABLE_TYPE = 'BASE TABLE';
-- 
-- -- 显示创建的视图数量
-- SELECT 
--     COUNT(*) as 视图数量,
--     GROUP_CONCAT(TABLE_NAME) as 视图名列表
-- FROM information_schema.TABLES 
-- WHERE TABLE_SCHEMA = 'xiaomizha' 
--   AND TABLE_TYPE = 'VIEW';
-- 
-- -- 显示用户数据统计
-- SELECT 
--     COUNT(*) as 用户总数,
--     SUM(CASE WHEN account_status = 1 THEN 1 ELSE 0 END) as 正常用户数,
--     SUM(CASE WHEN account_status = 0 THEN 1 ELSE 0 END) as 禁用用户数,
--     MIN(created_at) as 最早注册时间,
--     MAX(created_at) as 最近注册时间
-- FROM users;












-- ============================================
-- 使用示例
-- ============================================

-- -- 查看系统信息
-- CALL sp_get_system_info();
-- 
-- -- 查看数据库表大小
-- SELECT * FROM database_size_view;
-- 
-- -- 彻底清理数据库
-- CALL sp_clean_database();
-- 
-- -- 查看用户统计信息
-- SELECT * FROM user_complete_info_view;
-- 
-- -- 查看VIP到期提醒
-- SELECT * FROM vip_expiration_reminder_view;
-- 
-- -- 查看用户登录统计
-- SELECT * FROM user_login_statistics_view;
-- 
-- -- 查询用户最后登录信息
-- SELECT * FROM user_last_login_view WHERE user_id = 10001;
-- 
-- -- 查询用户完整信息
-- SELECT * FROM user_complete_info_view WHERE user_id = 10001;
-- 
-- -- 获取用户积分详细统计
-- CALL sp_get_user_points_detail(10001, NULL);
-- CALL sp_get_user_points_detail(10001, 60);
-- 
-- -- 手动调整用户积分
-- CALL sp_adjust_user_points(10001, 100, 'ADMIN_ADJUST', '管理员调整积分', 10000);
-- CALL sp_adjust_user_points(10001, -50, 'CONSUME', '兑换礼品消耗积分', 10000);
-- 
-- 批量调整用户积分
-- CALL sp_batch_adjust_user_points('10001,10002,10003,10004', 50, 'ADMIN_ADJUST', '活动奖励积分', 10000);
-- 
-- 获取积分系统报告
-- CALL sp_get_points_system_report(NULL, NULL);
-- CALL sp_get_points_system_report(DATE_SUB(CURDATE(), INTERVAL 7 DAY), CURDATE());
-- 
-- -- 给用户添加成长值
-- CALL sp_add_vip_points(10001, 'DAILY_LOGIN', 0, 'LOGIN_20260118', 'LOGIN');
-- CALL sp_add_vip_points(10001, 'PURCHASE_AMOUNT', 200, 'ORDER_20260118', 'PURCHASE');
-- CALL sp_add_vip_points(10001, 'COMPLETE_PROFILE', 50, 'PROFILE_20260118', 'PROFILE');
-- 
-- -- 查询VIP用户统计
-- SELECT * FROM vip_user_stats_view ORDER BY vip_level DESC;
-- 
-- -- 查询积分排行榜
-- SELECT * FROM user_points_ranking_view LIMIT 10;
-- 
-- -- 查询用户积分变更记录
-- SELECT * FROM user_points_log WHERE user_id = 10001 ORDER BY created_at DESC LIMIT 10;
-- 
-- -- 查询用户VIP变更记录
-- SELECT * FROM user_vip_log WHERE user_id = 10001 ORDER BY created_at DESC LIMIT 10;
-- 
-- -- 查询用户VIP详情
-- SELECT * FROM user_vip_detail_view WHERE user_id = 10001;
-- 
-- -- 查询用户升级进度
-- SELECT * FROM user_upgrade_progress_view WHERE user_id = 10001;
-- 
-- -- 查询VIP等级分布
-- SELECT * FROM vip_level_distribution_view;
-- 
-- -- 查询用户的成长值获取记录
-- SELECT 
--     up.nickname,
--     vpr.rule_name,
--     uvpl.points_earned,
--     uvpl.current_vip_points,
--     uvpl.created_at
-- FROM user_vip_points_log uvpl
-- JOIN vip_points_rules vpr ON uvpl.rule_id = vpr.rule_id
-- JOIN user_profiles up ON uvpl.user_id = up.user_id
-- WHERE uvpl.user_id = 10001
-- ORDER BY uvpl.created_at DESC
-- LIMIT 10;
-- 
-- -- 手动触发VIP等级更新
-- CALL sp_update_user_vip_level(10001);
-- 
-- -- 手动重置每日计数(通常由定时任务执行)
-- CALL sp_reset_daily_points();
-- 
-- -- 检查VIP到期状态
-- CALL sp_check_vip_expiration();
-- 
-- -- 批量更新next_level_required
-- CALL sp_update_all_next_level_required();
-- 
-- -- 检查表是否存在
-- SELECT fn_table_exists('users') as users_exists;
-- 
-- -- 获取用户表的下一个ID
-- SELECT fn_get_next_auto_increment('users') as next_user_id;
-- 
-- -- 获取用户表记录数
-- SELECT fn_get_table_row_count('users') as user_count;
-- 
-- 
-- 
-- 
-- 
-- -- ============================================
-- -- 示例查询
-- -- ============================================
-- 
-- -- 用户登录成功后, 系统会记录到user_logs表, 触发器会自动创建登录记录
-- INSERT INTO user_logs (user_id, action, ip_address, user_agent, device_info, status)
-- VALUES (10001, 'LOGIN', '192.168.1.100', 'Mozilla/5.0...', 'iPhone 13', 1);
-- 
-- -- 查询用户最近5次登录记录
-- SELECT * FROM user_login_records 
-- WHERE user_id = 10001 
-- ORDER BY created_at DESC 
-- LIMIT 5;
-- 
-- -- 查询某个IP地址的登录统计
-- SELECT 
--     ip_address,
--     COUNT(*) as login_count,
--     COUNT(DISTINCT user_id) as user_count
-- FROM user_login_records
-- WHERE login_status = 1
-- GROUP BY ip_address
-- ORDER BY login_count DESC;
-- 
-- -- 手动插入登录失败记录
-- INSERT INTO user_login_records 
-- (user_id, ip_address, user_agent, login_status, failure_reason)
-- VALUES 
-- (10001, '192.168.1.100', 'Mozilla/5.0...', 0, '密码错误');
-- 
-- -- 获取用户登录统计
-- SELECT 
--     u.user_id,
--     u.username,
--     COUNT(ulr.login_id) as total_logins,
--     SUM(CASE WHEN ulr.login_status = 1 THEN 1 ELSE 0 END) as successful_logins,
--     MAX(ulr.created_at) as last_login_time
-- FROM users u
-- LEFT JOIN user_login_records ulr ON u.user_id = ulr.user_id
-- GROUP BY u.user_id, u.username;
-- 
-- -- ============================================
-- -- 示例查询
-- -- ============================================
-- 
-- -- 给用户添加积分
-- -- 首先更新积分表
-- UPDATE user_points 
-- SET total_points = total_points + 100, available_points = available_points + 100
-- WHERE user_id = 10001;
-- 
-- UPDATE user_vip_info 
-- SET 
--     vip_points = vip_points + 100,
--     total_earned_points = total_earned_points + 100,
--     points_today = points_today + 100,
--     points_this_month = points_this_month + 100,
--     last_points_date = CURDATE(),
--     updated_at = NOW()
-- WHERE user_id = 10001;
-- 
-- -- 然后手动记录积分变更日志
-- INSERT INTO user_points_log 
-- (user_id, points_change, points_type, current_total, current_available, description)
-- SELECT 
--     user_id, 
--     100, 
--     'TASK', 
--     total_points, 
--     available_points, 
--     '完成任务获得积分'
-- FROM user_points 
-- WHERE user_id = 10001;
-- 
-- -- 7. 升级用户VIP等级
-- UPDATE user_vip_info 
-- SET vip_level = vip_level + 1, vip_upgrade_date = NOW()
-- WHERE user_id = 10001 AND vip_points >= 1000;
-- 
-- -- 8. 查询即将到期的VIP用户
-- SELECT 
--     u.user_id,
--     u.username,
--     un.display_name,
--     vi.vip_level,
--     vi.vip_expire_date,
--     DATEDIFF(vi.vip_expire_date, CURDATE()) as days_to_expire
-- FROM users u
-- JOIN user_names un ON u.user_id = un.user_id
-- JOIN user_vip_info vi ON u.user_id = vi.user_id
-- WHERE vi.vip_status = 'ACTIVE' 
-- AND vi.vip_expire_date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
-- ORDER BY vi.vip_expire_date;
-- 
-- -- 9. 查询活跃的VIP用户
-- SELECT 
--     u.username,
--     un.display_name,
--     uvi.vip_level,
--     uvi.vip_points,
--     uvi.vip_expire_date
-- FROM user_vip_info uvi
-- JOIN users u ON uvi.user_id = u.user_id
-- JOIN user_names un ON uvi.user_id = un.user_id
-- WHERE uvi.vip_status = 'ACTIVE'
-- ORDER BY uvi.vip_level DESC, uvi.vip_points DESC;
-- 
-- -- ============================================
-- -- 示例查询
-- -- ============================================
-- 
-- -- 查询所有用户完整信息
-- SELECT 
--     u.user_id,
--     u.username AS '登录账户名',
--     un.create_name AS '创建用户名',
--     un.display_name AS '显示名称',
--     up.nickname AS '用户昵称',
--     up.email AS '邮箱',
--     up2.total_points AS '总积分',
--     vi.vip_level AS 'VIP等级',
--     vi.vip_status AS 'VIP状态',
--     vi.vip_expire_date AS 'VIP到期日',
--     u.account_status AS '账户状态',
--     u.created_at AS '注册时间'
-- FROM users u
-- LEFT JOIN user_names un ON u.user_id = un.user_id
-- LEFT JOIN user_profiles up ON u.user_id = up.user_id
-- LEFT JOIN user_points up2 ON u.user_id = up2.user_id
-- LEFT JOIN user_vip_info vi ON u.user_id = vi.user_id
-- ORDER BY u.user_id;
-- 
-- -- 查询最新登录记录
-- SELECT 
--     u.username,
--     ulr.ip_address,
--     ulr.created_at AS '登录时间',
--     ulr.login_type,
--     ulr.login_status
-- FROM user_login_records ulr
-- JOIN users u ON ulr.user_id = u.user_id
-- ORDER BY ulr.created_at DESC
-- LIMIT 10;
-- 
-- -- 查询用户操作日志
-- SELECT 
--     u.username,
--     ul.action,
--     ul.level,
--     ul.details,
--     ul.created_at
-- FROM user_logs ul
-- JOIN users u ON ul.user_id = u.user_id
-- ORDER BY ul.created_at DESC
-- LIMIT 10;
-- 
-- -- 查询完整的VIP信息
-- SELECT 
--     u.user_id,
--     u.username,
--     uvi.vip_level,
--     vlc.level_name,
--     uvi.vip_points,
--     uvi.next_level_required,
--     uvi.total_earned_points,
--     uvi.points_today,
--     uvi.points_this_month,
--     uvi.vip_status,
--     uvi.vip_expire_date,
--     uvi.level_expire_date,
--     uvi.total_recharge_amount,
--     -- 计算升级所需
--     CASE 
--         WHEN uvi.next_level_required IS NULL THEN '最高等级'
--         ELSE CONCAT('还需', uvi.next_level_required - uvi.vip_points, '成长值')
--     END as upgrade_needed,
--     -- 计算距离到期天数
--     CASE 
--         WHEN uvi.vip_expire_date IS NULL THEN '永久'
--         ELSE CONCAT(DATEDIFF(uvi.vip_expire_date, CURDATE()), '天')
--     END as days_to_expire
-- FROM `user_vip_info` uvi
-- JOIN `users` u ON uvi.user_id = u.user_id
-- LEFT JOIN `vip_level_config` vlc ON uvi.vip_level = vlc.vip_level
-- ORDER BY uvi.vip_level DESC, uvi.vip_points DESC;

-- -- ============================================
-- -- 示例查询
-- -- ============================================
-- 
-- -- 查询所有系统配置
-- SELECT * FROM system_configs ORDER BY config_key;
-- 
-- -- 查询公开的系统配置
-- SELECT * FROM system_configs WHERE is_public = TRUE ORDER BY config_key;
-- 
-- -- 查询用户反馈详情
-- SELECT * FROM user_feedback_detail_view ORDER BY created_at DESC LIMIT 10;
-- 
-- -- 查询待处理的反馈
-- SELECT * FROM pending_feedback_reminder_view;
-- 
-- -- 查询反馈类型统计
-- SELECT * FROM user_feedback_stats_by_type_view;
-- 
-- -- 查询用户反馈统计
-- CALL sp_get_user_feedback_stats(NULL, NULL);
-- CALL sp_get_user_feedback_stats(DATE_SUB(CURDATE(), INTERVAL 30 DAY), CURDATE());
-- 
-- -- 查询某个用户的反馈历史
-- CALL sp_get_user_feedback_history(10001, 10, 0);
-- 
-- -- 获取系统信息(包含反馈统计)
-- CALL sp_get_system_info();
-- 
-- -- 更新反馈状态示例
-- CALL sp_update_feedback_status(1, 3, '问题已解决, 感谢您的反馈！', 10000);
-- 
-- -- 查询VIP特权配置
-- SELECT config_value FROM system_configs WHERE config_key = 'vip_benefits_descriptions';
-- 
-- -- 查询积分获取途径
-- SELECT config_value FROM system_configs WHERE config_key = 'points_acquisition_methods';




















