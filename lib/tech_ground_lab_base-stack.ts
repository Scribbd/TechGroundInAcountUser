import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as fs from "fs";
import { PolicyDocument } from '@aws-cdk/aws-iam';

/**
 * Base Stack for TechGroundLabs.
 */
export class TechGroundLabBaseStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Setup Group
    const genGroup = new iam.Group(this, 'Genned_Group', {
      groupName: "Generated User Group"
    });

    // Setup Group Policy
    let policyPath = "./policy/" + this.node.tryGetContext('policy_document_name');
    const genPolicy = new iam.ManagedPolicy(this, 'Generated_Policy', {
      groups: [genGroup],
      managedPolicyName: "Generated Managed Policy",
      document: PolicyDocument.fromJson(JSON.parse(fs.readFileSync(policyPath).toString()))
    });

    // Generate accounts with context values number_of_students
    for(let num of [...Array(this.node.tryGetContext('number_of_students')).keys()]) {
      // Load in values from context
      let name = this.node.tryGetContext('account_prefix') + '-' + (num).toLocaleString(undefined, {minimumIntegerDigits: 2});
      let password = this.genPassword(this.node.tryGetContext('password_length'))

      let user = new iam.User(this, name, {
        groups: [genGroup],
        userName: name,
        password: cdk.SecretValue.plainText(password)
      });
    }
  }

  /**
   * Generates a password 
   * length: number 
   *  length of password to be generated
   */
  genPassword(length: number): string {
    let randomstring = Math.random().toString(36).slice(-length);
    // Math.random can return 0
    if (randomstring == "0")
      return this.genPassword(length);
    return randomstring;
  }
}
