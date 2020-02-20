"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  router as ProductRouter
} from './routes/router';