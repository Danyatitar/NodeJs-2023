import express from "express";
import { Request, Response, Router } from "express";
import db from "../coonection";

const router: Router = express.Router();

router.get("/task1", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select users.id, users.name, users.avatar_url, channels.photo_url,channels.description, channels.created_at 
  from users join channels on channels.user_id=users.id order by channels.created_at desc`,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.get("/task2", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select videos.title, videos.description,videos.preview_url, videos.file_url, videos.duration, 
    videos.published_at, count(*) as likes 
    from videos join likes on likes.video_id=videos.id where likes.positive=true group by videos.id order by likes desc limit 5`,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.get("/task3", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select videos.id, videos.title, videos.preview_url, videos.duration,videos.published_at
  from users join (channels join videos on videos.channel_id=channels.id) on users.id=channels.user_id 
  where users.name='Stephanie Bulger' order by videos.published_at desc`,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.get("/task4", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select channels.id, channels.description, channels.photo_url, channels.created_at, count(*) as subscribers
    from subscriptions join channels on channels.id=subscriptions.channel_id 
    where channel_id= '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' group by channels.id
    `,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.get("/task5", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select videos.title, videos.description,videos.preview_url, videos.file_url, videos.duration, 
    videos.published_at, count(*) as activity
    from videos join likes on likes.video_id=videos.id 
    where videos.published_at>='2021-09-01' group by videos.id having 
    (select count(*) from likes WHERE  likes.video_id = videos.id AND likes.positive = true)>4
    order by activity desc limit 10
      `,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

router.get("/task6", (req: Request, res: Response) => {
  console.log(db);
  db.query(
    `select users.name, users.avatar_url,channels.photo_url,channels.description,subscriptions.level
    from users join (channels join subscriptions on subscriptions.channel_id=channels.id) on users.id=channels.user_id
    where users.name='Ennis Haestier'
    order by ((ARRAY_POSITION(ARRAY['vip','follower','fan'], subscriptions.level), subscriptions.level),subscriptions.subscribed_at)`,
    (err, result) => {
      res.json(result.rows);
    }
  );
});

export default router;
