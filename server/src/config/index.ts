import dotenv from 'dotenv';
import path from 'path';

const projectRoot = path.resolve(__dirname, '../../')
const envFilePath: string = path.resolve(projectRoot, '.env');

dotenv.config({
  debug: true,
  path: envFilePath,
  encoding: 'utf8',
  override: false
});
