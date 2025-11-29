// src/main.server.ts
import 'zone.js/node'; // 👈 necesario para SSR con zonas

import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

import { mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

// Config extra solo para el lado servidor
const serverConfig = mergeApplicationConfig(appConfig, {
  providers: [provideServerRendering()],
});

const bootstrap = () => bootstrapApplication(App, serverConfig);

export default bootstrap;
