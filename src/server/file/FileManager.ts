import {MyServer} from '../MyServer';
import {Client} from '../../client';
import fetch from 'cross-fetch';
import {URL} from 'url';
import {AbstractReply, FileResponse} from '../../reply';
import {BaseManager} from '../../base';
import {IFileManager} from './IFileManager';

/**
 * Manages API methods for files.
 * @extends {BaseManager}
 */
export class FileManager extends BaseManager implements IFileManager {
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<FileResponse[]>>)
      .then(this.client.checkResponse)
      .then(value => value.result)
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
      .then(res => res.json() as Promise<AbstractReply<string>>)
      .then(this.client.checkResponse)
      .then(value => value.result)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
      .then(res => res.json() as Promise<AbstractReply<{}>>)
      .then(this.client.checkResponse)
      .then(() => true)
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
