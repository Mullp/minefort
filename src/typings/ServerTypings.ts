export type ServerProperties =
  | 'cosmetics'
  | 'offline-support'
  | 'bedrock-support'
  | 'version'
  | 'lobby-visible'
  | 'startup-command'
  | 'level-type'
  | 'level-name'
  | 'generator-settings'
  | 'gamemode'
  | 'force-gamemode'
  | 'pvp'
  | 'spawn-monsters'
  | 'spawn-animals'
  | 'allow-flight'
  | 'difficulty'
  | 'hardcore'
  | 'enable-command-block'
  | 'generate-structures'
  | 'allow-nether'
  | 'resource-pack';

export enum ServerCategory {
  DEFAULT = 'DEFAULT',
  SKYBLOCK = 'SKYBLOCK',
  SURVIVAL = 'SURVIVAL',
  CREATIVE = 'CREATIVE',
  GENS = 'GENS',
  PRISON = 'PRISON',
  PVP = 'PVP',
  ADVENTURE = 'ADVENTURE',
}

export enum SubUserRole {
  VIEWER = 0,
  MODERATOR = 1,
  ADMIN = 2,
  OWNER = 3,
}

export enum ServerState {
  SERVICE_OFFLINE = 0,
  UPLOADING = 1,
  DOWNLOADING = 2,
  STARTING = 3,
  ONLINE = 4,
  OFFLINE = 5,
  CREATING_BACKUP = 6,
  RESTORING_BACKUP = 7,
  STOPPING = 8,
}
