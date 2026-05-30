import { mergeTests, mergeExpects } from '@playwright/test';
import { test as authTest, expect as authExpect } from './auth.fixture';
import { test as pageTest, expect as pageExpect } from './page.fixture';

export const test = mergeTests(authTest, pageTest);
export const expect = mergeExpects(authExpect, pageExpect);
