import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  SingleTypeSchema,
  ComponentAttribute,
  MediaAttribute,
  DateAttribute,
  UIDAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  ComponentSchema,
  TextAttribute,
} from "@strapi/strapi"

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission"
    description: ""
    singularName: "permission"
    pluralName: "permissions"
    displayName: "Permission"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    properties: JSONAttribute & DefaultTo<{}>
    conditions: JSONAttribute & DefaultTo<[]>
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User"
    description: ""
    singularName: "user"
    pluralName: "users"
    displayName: "User"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    username: StringAttribute
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    registrationToken: StringAttribute & PrivateAttribute
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>
    preferedLanguage: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute
  }
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role"
    description: ""
    singularName: "role"
    pluralName: "roles"
    displayName: "Role"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute
  }
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token"
    singularName: "api-token"
    pluralName: "api-tokens"
    displayName: "Api Token"
    description: ""
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1
      }> &
      DefaultTo<"">
    type: EnumerationAttribute<["read-only", "full-access"]> &
      DefaultTo<"read-only">
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface ApiGlobalGlobal extends SingleTypeSchema {
  info: {
    singularName: "global"
    pluralName: "globals"
    displayName: "Global"
    description: ""
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    phone: StringAttribute
    siteName: StringAttribute & RequiredAttribute
    defaultSeo: ComponentAttribute<"shared.seo"> & RequiredAttribute
    favicon: MediaAttribute
    vk: StringAttribute & RequiredAttribute
    odnoklassniki: StringAttribute
    youtube: StringAttribute
    rutube: StringAttribute
    telegram: StringAttribute
    facebook: StringAttribute
    instagram: StringAttribute
    username: StringAttribute & PrivateAttribute & DefaultTo<"username">
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "api::global.global",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "api::global.global",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface ApiReleaseRelease extends CollectionTypeSchema {
  info: {
    singularName: "release"
    pluralName: "releases"
    displayName: "Release"
    description: ""
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    name: StringAttribute
    type: EnumerationAttribute<["single", "album"]> &
      RequiredAttribute &
      DefaultTo<"single">
    artistName: StringAttribute
    date: DateAttribute
    img: MediaAttribute & RequiredAttribute
    user: RelationAttribute<
      "api::release.release",
      "manyToOne",
      "plugin::users-permissions.user"
    >
    slug: UIDAttribute<"api::release.release", "name">
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "api::release.release",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "api::release.release",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file"
    pluralName: "files"
    displayName: "File"
    description: ""
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute & RequiredAttribute
    alternativeText: StringAttribute
    caption: StringAttribute
    width: IntegerAttribute
    height: IntegerAttribute
    formats: JSONAttribute
    hash: StringAttribute & RequiredAttribute
    ext: StringAttribute
    mime: StringAttribute & RequiredAttribute
    size: DecimalAttribute & RequiredAttribute
    url: StringAttribute & RequiredAttribute
    previewUrl: StringAttribute
    provider: StringAttribute & RequiredAttribute
    provider_metadata: JSONAttribute
    related: RelationAttribute<"plugin::upload.file", "morphToMany">
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder"
    pluralName: "folders"
    displayName: "Folder"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1
      }>
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale"
    pluralName: "locales"
    collectionName: "locales"
    displayName: "Locale"
    description: ""
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1
        max: 50
      }>
    code: StringAttribute & UniqueAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: "permission"
    description: ""
    singularName: "permission"
    pluralName: "permissions"
    displayName: "Permission"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    action: StringAttribute & RequiredAttribute
    role: RelationAttribute<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: "role"
    description: ""
    singularName: "role"
    pluralName: "roles"
    displayName: "Role"
  }
  pluginOptions: {
    "content-manager": {
      visible: false
    }
    "content-type-builder": {
      visible: false
    }
  }
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    description: StringAttribute
    type: StringAttribute & UniqueAttribute
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >
    users: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: "user"
    description: ""
    singularName: "user"
    pluralName: "users"
    displayName: "User"
  }
  options: {
    draftAndPublish: false
    timestamps: true
  }
  attributes: {
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    provider: StringAttribute
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: StringAttribute & PrivateAttribute
    confirmationToken: StringAttribute & PrivateAttribute
    confirmed: BooleanAttribute & DefaultTo<false>
    blocked: BooleanAttribute & DefaultTo<false>
    role: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >
    phone: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 11
      }>
    name: StringAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3
      }>
    releases: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToMany",
      "api::release.release"
    >
    slug: UIDAttribute<"plugin::users-permissions.user", "name">
    vk: StringAttribute
    odnoklassniki: StringAttribute
    youtube: StringAttribute
    rutube: StringAttribute
    telegram: StringAttribute
    facebook: StringAttribute
    instagram: StringAttribute
    site: StringAttribute
    avatar: MediaAttribute
    username: StringAttribute
    createdAt: DateTimeAttribute
    updatedAt: DateTimeAttribute
    createdBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
    updatedBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute
  }
}

export interface SharedSeo extends ComponentSchema {
  info: {
    name: "Seo"
    icon: "allergies"
  }
  attributes: {
    metaTitle: StringAttribute & RequiredAttribute
    metaDescription: TextAttribute & RequiredAttribute
    shareImage: MediaAttribute
  }
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission
      "admin::user": AdminUser
      "admin::role": AdminRole
      "admin::api-token": AdminApiToken
      "api::global.global": ApiGlobalGlobal
      "api::release.release": ApiReleaseRelease
      "plugin::upload.file": PluginUploadFile
      "plugin::upload.folder": PluginUploadFolder
      "plugin::i18n.locale": PluginI18NLocale
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission
      "plugin::users-permissions.role": PluginUsersPermissionsRole
      "plugin::users-permissions.user": PluginUsersPermissionsUser
      "shared.seo": SharedSeo
    }
  }
}
