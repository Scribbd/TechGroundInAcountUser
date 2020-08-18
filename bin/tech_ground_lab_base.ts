#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TechGroundLabBaseStack } from '../lib/tech_ground_lab_base-stack';

const app = new cdk.App();
new TechGroundLabBaseStack(app, 'TechGroundLabBaseStack');