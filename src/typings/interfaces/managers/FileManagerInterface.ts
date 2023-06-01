import {MyServer} from '../../../classes';
import {FileResponse} from '../../responses';

export interface FileManagerInterface {
  /**
   * The server that this file manager is for.
   */
  readonly server: MyServer;

  /**
   * Lists all files in a directory.
   * @param path - The path to list files for.
   * @return A promise that resolves to an array of files.
   * @throws {Error} - Throws an error.
   */
  listFiles(path: string): Promise<FileResponse[]>;

  /**
   * Reads a file.
   * @param path - The path to the file to read.
   * @return A promise that resolves to the file's contents.
   * @throws {Error} - Throws an error.
   */
  readFile(path: string): Promise<string>;

  /**
   * Deletes a file.
   * @param path - The path to the file to delete.
   * @return A promise that resolves to a boolean indicating whether the file was deleted.
   * @throws {Error} - Throws an error.
   */
  deleteFile(path: string): Promise<boolean>;

  /**
   * Writes a to a file.
   * @param path - The path to the file to write to.
   * @param content - The content to write to the file.
   * @return A promise that resolves to a boolean indicating whether the file was written to.
   * @throws {Error} - Throws an error.
   */
  writeFile(path: string, content: string): Promise<boolean>;

  /**
   * Renames a file.
   * @param path - The path to the file to rename.
   * @param newPath - The new path to the file.
   * @return A promise that resolves to a boolean indicating whether the file was renamed.
   * @throws {Error} - Throws an error.
   */
  renameFile(path: string, newPath: string): Promise<boolean>;

  /**
   * Creates a file.
   * @param path - The path to the file to create.
   * @param type - The type of file to create.
   * @return A promise that resolves to a boolean indicating whether the file was created.
   * @throws {Error} - Throws an error.
   */
  createFile(path: string, type: 'file' | 'directory'): Promise<boolean>;
}
