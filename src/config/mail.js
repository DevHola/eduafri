import nodemailer from 'nodemailer'
const host = process.env.MAIL_HOST
const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS
export const reusableMail = async (subject, content, to, from) => {
  try {
    const transporter = nodemailer.createTransport({
      host,
      port: 2525,
      auth: {
        user,
        pass
      }
    })
    await transporter.sendMail({
      from,
      to,
      subject,
      html: content
    })
  } catch (error) {
      throw new Error(`mailing failed`)
  }
}
