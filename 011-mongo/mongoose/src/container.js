console.clear();
import "reflect-metadata";
import { Container } from "inversify";

const container = new Container();
container.bind(BooksRepository).toSelf();

module.exports = container.get(BooksRepository);