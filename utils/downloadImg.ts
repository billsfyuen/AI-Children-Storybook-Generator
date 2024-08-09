import fs from "fs"
import client from "https"
import path from "path";

//imageType can be character or page
export function downloadImage(url: string, imageType: string) {
    const filename = newFilename()

    const filepath = path.resolve(__dirname, `../uploads/${imageType}Img/${filename}`)

    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filename));

            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });

}

function newFilename() {
    let now = new Date()
    let newFilename = now.getTime() + ".jpeg"
    return newFilename
}

