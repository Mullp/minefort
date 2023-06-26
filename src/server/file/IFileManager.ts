import {MyServer} from '../MyServer';

import {FileResponse} from '../../reply';

export interface IFileManager {
  /**
   * The server that this file manager is for.
   */
  readonly server: MyServer;

  /**
   * Lists all files in a directory.
   * @param path - The path to list files for.
   * @return - A list of files in the directory.
   */
  listFiles(path: string): Promise<FileResponse[]>;

  /**
   * Reads a file.
   * @param path - The path to the file to read.
   * @return - The contents of the file.
   * @throws {Error} - Throws an error.
   */
  readFile(path: string): Promise<string>;

  /**
   * Deletes a file.
   * @param path - The path to the file to delete.
   * @return - Whether the file was deleted or not.
   */
  deleteFile(path: string): Promise<boolean>;

  /**
   * Writes a to a file.
   * @param path - The path to the file to write to.
   * @param content - The content to write to the file.
   * @return - Whether the file was written to or not.
   */
  writeFile(path: string, content: string): Promise<boolean>;

  /**
   * Renames a file.
   * @param path - The path to the file to rename.
   * @param newName - The new name of the file.
   * @return - Whether the file was renamed or not.
   */
  renameFile(path: string, newName: string): Promise<boolean>;

  /**
   * Creates a file.
   * @param path - The path to the file to create.
   * @param type - The type of file to create.
   * @return - Whether the file was created or not.
   */
  createFile(path: string, type: 'file' | 'directory'): Promise<boolean>;
}
