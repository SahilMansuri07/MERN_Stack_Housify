import express from 'express';

export const Test =  (req, res) => {
  res.send('User route is working');
  console.log(req.body);
};