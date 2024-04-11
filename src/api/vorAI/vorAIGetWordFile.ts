import ApiResponseHandler from '../apiResponseHandler';
import fs from 'fs';
import { Document, Paragraph, TextRun, Packer, LevelFormat, AlignmentType } from 'docx';

export default async (req, res, next) => {
  try {
    const { file, text } = req.body;

    const pairs = text.split("Question - ");
    pairs.shift();

    let children: Array<Paragraph> = new Array<Paragraph>();
    let pair = [];

    for (let i = 0; i < pairs.length; i++) {
      pair = pairs[i].split("Answer - ");

      children.push(new Paragraph({
        text: pair[0],
        numbering: {
          reference: "my-numbering",
          level: 0,
        }
      }));

      children.push(new Paragraph({}));

      children.push(new Paragraph({
        indent: { left: 576 },
        children: [new TextRun({ children: [pair[1]] })],
      }));

      children.push(new Paragraph({}));
    }

    const doc = new Document({
      numbering: {
        config: [
          {
            reference: "my-numbering",
            levels: [
              {
                level: 0,
                format: LevelFormat.DECIMAL_ENCLOSED_FULLSTOP,
                text: "%1",
                alignment: AlignmentType.START,
                style: {
                  paragraph: {
                    indent: { left: 576, hanging: 400 },
                  },
                },
              },
            ],
          },
        ],
      },
      sections: [
        {
          properties: {},
          children: children,
        },
      ],
    });

    // Generate the document into a buffer
    const buffer = await Packer.toBuffer(doc);

    // Create a temporary file to save the buffer
    const tempFilePath = `./${file}`;
    fs.writeFileSync(tempFilePath, buffer);

    // Use res.download to send the temporary file for download
    res.download(tempFilePath, file, (err) => {
      if (err) {
        // Handle any errors that occur during the download
        console.error(err);
        res.status(500).send('Error downloading the file');
      }
      // After the download is complete, delete the temporary file
      fs.unlinkSync(tempFilePath);
    });
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
