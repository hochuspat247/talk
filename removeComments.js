const fs = require('fs');
const path = require('path');
const stripComments = require('strip-comments');

function removeCommentsFromFiles(directory) {
  fs.readdir(directory, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    dirents.forEach((dirent) => {
      const filePath = path.join(directory, dirent.name);

      if (dirent.isDirectory()) {
        removeCommentsFromFiles(filePath);
      } else if (dirent.isFile() && (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.js') || filePath.endsWith('.jsx'))) {
        fs.readFile(filePath, 'utf8', (err, data) => {
          if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            return;
          }

          const result = stripComments(data, { preserveNewlines: true });

          fs.writeFile(filePath, result, 'utf8', (err) => {
            if (err) {
              console.error(`Error writing file ${filePath}:`, err);
            } else {
              console.log(`Comments removed from ${filePath}`);
            }
          });
        });
      }
    });
  });
}

removeCommentsFromFiles(path.join(__dirname, 'src'));