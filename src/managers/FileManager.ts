import {BaseManager} from './BaseManager';
import {
  FileManagerInterface,
  FileResponse,
  ResponseStatus,
  ServerFileCreateResponse,
  ServerFileDeleteResponse,
  ServerFileReadResponse,
  ServerFileRenameResponse,
  ServerFilesListResponse,
  ServerFileWriteResponse,
} from '../typings';
import {MyServer} from '../classes';
import {Client} from '../client';
import fetch from 'cross-fetch';
import {URL} from 'url';

/**
 * Manages API methods for files.
 * @extends {BaseManager}
 */
export class FileManager extends BaseManager implements FileManagerInterface {
  public readonly server: MyServer;

  public constructor(client: Client, server: MyServer) {
    super(client);
    this.server = server;
  }

  public async createFile(
    path: string,
    type: 'file' | 'directory'
  ): Promise<boolean> {
    const splitPath = this.splitPath(this.prependRoot(path));

    return await fetch(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/create',
      {
        method: 'POST',
        body: JSON.stringify({
          filePath: splitPath.filePath,
          fileName: splitPath.fileName,
          fileType: type === 'file' ? 'file' : 'folder',
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerFileCreateResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, file may already exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async deleteFile(path: string): Promise<boolean> {
    const splitPath = this.splitPath(this.prependRoot(path));

    return await fetch(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/remove',
      {
        method: 'POST',
        body: JSON.stringify({
          filePath: splitPath.filePath,
          fileName: splitPath.fileName,
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerFileDeleteResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, file may not exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async listFiles(path: string): Promise<FileResponse[]> {
    const url = new URL(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/list'
    );
    url.searchParams.set('path', this.prependRoot(path));

    return await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerFilesListResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, directory may not exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        throw new Error('Unknown error');
      })
      .catch(error => {
        throw error;
      });
  }

  public async readFile(path: string): Promise<string> {
    const splitPath = this.splitPath(this.prependRoot(path));

    const url = new URL(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/read'
    );
    url.searchParams.set('filePath', splitPath.filePath);
    url.searchParams.set('fileName', splitPath.fileName);

    return await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: this.client.cookie,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json() as Promise<ServerFileReadResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return value.result;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, file may not exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        throw new Error('Unknown error');
      })
      .catch(error => {
        throw error;
      });
  }

  public async renameFile(path: string, newName: string): Promise<boolean> {
    const splitPath = this.splitPath(this.prependRoot(path));

    return await fetch(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/rename',
      {
        method: 'POST',
        body: JSON.stringify({
          filePath: splitPath.filePath,
          fileName: splitPath.fileName,
          newFileName: newName,
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerFileRenameResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, file may not exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  public async writeFile(path: string, content: string): Promise<boolean> {
    const splitPath = this.splitPath(this.prependRoot(path));

    return await fetch(
      this.client.BASE_URL + '/server/' + this.server.id + '/files/write',
      {
        method: 'POST',
        body: JSON.stringify({
          filePath: splitPath.filePath,
          fileName: splitPath.fileName,
          content: content,
        }),
        headers: {
          Cookie: this.client.cookie,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json() as Promise<ServerFileWriteResponse>)
      .then(value => {
        if (value.status === ResponseStatus.OK) {
          return true;
        } else if (value.status === ResponseStatus.NOT_AUTHENTICATED) {
          throw new Error('Not authenticated');
        } else if (value.status === ResponseStatus.INVALID_STATE) {
          throw new Error('Invalid state');
        } else if (value.status === ResponseStatus.NO_PERMISSION) {
          throw new Error('No permission');
        } else if (value.status === ResponseStatus.ITEM_NOT_FOUND) {
          throw new Error('Item not found, file may not exist');
        } else if (value.status === ResponseStatus.INTERNAL_ERROR) {
          throw new Error('Internal error');
        } else if (value.status === ResponseStatus.INVALID_INPUT) {
          throw new Error('Invalid input: ' + value.error.body[0].message);
        }

        return false;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Splits a path into a file path and a file name.
   * @param path - The path to split.
   * @return An object containing the file path and file name.
   * @private
   */
  private splitPath(path: string): {filePath: string; fileName: string} {
    const split = path.split('/');
    const fileName = split.pop() as string;
    const filePath = split.join('/');

    return {filePath, fileName};
  }

  /**
   * Prepends "root/" to a path if it doesn't already start with it.
   * @param path - The path to prepend.
   * @return The path with "root/" prepended.
   * @private
   */
  private prependRoot(path: string): string {
    if (path.startsWith('root/')) {
      return path;
    } else {
      return 'root/' + path;
    }
  }
}
