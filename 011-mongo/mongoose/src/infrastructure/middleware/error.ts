export default (req: any, res: any) => {
    res.status(404);
    const content = '404 | not found';
    res.send(content);
};