
import fs from 'file-system';
import nunjucks from 'nunjucks'

export function generateArduino() {
    fs.readFile('./base.ino', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
    })
    nunjucks.configure({ autoescape: true });
    console.log(nunjucks.renderString('Hello {{ username }}', { username: 'James' }));
}