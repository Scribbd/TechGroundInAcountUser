import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TechGroundLabBase from '../lib/tech_ground_lab_base-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TechGroundLabBase.TechGroundLabBaseStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
