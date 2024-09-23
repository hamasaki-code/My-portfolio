import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // POSTリクエストのみを許可
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    // リクエストボディからフォームデータを取得
    const { name, email, message } = req.body;

    // 必須フィールドのバリデーション
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // データの処理 (例: データベースに保存、メール送信)
    // 実際にはここで外部サービスを呼び出すことが多いです

    // 成功レスポンス
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('Error in /api/contact:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
