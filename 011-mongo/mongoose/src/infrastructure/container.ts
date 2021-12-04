import 'reflect-metadata';
import { Container } from 'inversify';

import BooksRepository from '../books/books.service';
import UserRepository from '../users/user.service';

const container = new Container();
container.bind(BooksRepository).toSelf();
container.bind(UserRepository).toSelf();

export default container;
