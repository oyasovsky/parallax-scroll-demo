export interface ICheckSession {
    is_session_expired: boolean;
    session_expire_at: number;
    csrf_token: string;
}

export interface IInitialAuthParams {
        csrf_token: string;
}


export interface ICredentials {
        username: string;
        password: string;
}

export interface IAvatar{
        url: string;
}

export interface IUser {
        id: number;
        email: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        admin: boolean;
        projects_limit: number;
        skype: string;
        linkedin: string;
        twitter: string;
        authentication_token: string;
        theme_id: number;
        bio: string;
        extern_uid: string;
        provider: any;
        username: string;
        can_create_group: boolean;
        can_create_team: boolean;
        state: string;
        color_scheme_id: number;
        notification_level: number;
        password_expires_at: Date;
        created_by_id: number;
        last_credential_check_at: Date;
        avatar: IAvatar;
        hide_no_ssh_key: boolean;
        website_url: string;
        password_changed_at: Date;
        last_activity_at: Date;
        expired_at: Date;
        disable_devise_features: any;
        personal_timeout: number;
        role_id: number;
        flow_tips_enabled: boolean;
        system: boolean;
}

export interface ILoginResponse {
        user: IUser;
        csrf_token: string;
}

export interface IUserMetadata {
        roles: any;
        running_containers: number;
}