import fs from 'fs';

const imgStore = './avatars';

const uploadToLocal = async file => {
  try {
    if (!fs.existsSync(imgStore)) {
      fs.mkdirSync(imgStore);
    }
    const fileName = `${imgStore}/${file.originalname.replace(' ', '')}`;
    fs.writeFileSync(fileName, file.buffer);
    return { link: fileName.substr(2) };
  } catch (error) {
    return { };
  }
};

export const uploadImage = async file => {
  const image = await uploadToLocal(file);
  return image;
};
