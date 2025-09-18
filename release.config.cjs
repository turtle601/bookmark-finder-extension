/* eslint-disable no-template-curly-in-string */

const dateFormat = require('dateformat');

let choreMessage = '';
if (process.env.GITHUB_ACTIONS) {
  // CI IS SET
  choreMessage = ':construction_worker: chore(release): ${nextRelease.version}';
} else {
  // CI IS NOT SET
  choreMessage =
    ':construction_worker: chore(release): ${nextRelease.version} [skip ci]';
}

const config = {
  release: {
    defaultBranch: 'main',
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'main',
      'next',
      'next-major',
      {
        name: 'beta',
        prerelease: true,
      },
      {
        name: 'alpha',
        prerelease: true,
      },
    ],
  },
  plugins: [
    [
      'semantic-release-gitmoji',
      {
        releaseRules: {
          major: [':boom:'],
          minor: [':sparkles:'],
          patch: [
            ':zap:',
            ':bug:',
            ':ambulance:',
            ':lipstick:',
            ':lock:',
            ':arrow_down:',
            ':arrow_up:',
            ':pushpin:',
            ':chart_with_upwards_trend:',
            ':heavy_plus_sign:',
            ':heavy_minus_sign:',
            ':wrench:',
            ':globe_with_meridians:',
            ':pencil2:',
            ':rewind:',
            ':package:',
            ':alien:',
            ':bento:',
            ':wheelchair:',
            ':speech_balloon:',
            ':card_file_box:',
            ':children_crossing:',
            ':iphone:',
            ':egg:',
            ':alembic:',
            ':mag:',
            ':label:',
            ':triangular_flag_on_post:',
            ':goal_net:',
            ':dizzy:',
            ':wastebasket:',
            ':passport_control:',
            ':adhesive_bandage:',
            ':necktie:',
          ],
        },
        releaseNotes: {
          helpers: {
            datetime(format = 'UTC:yyyy-mm-dd') {
              return dateFormat(new Date(), format);
            },
          },
          issueResolution: {
            template: '{baseUrl}/{owner}/{repo}/issues/{ref}',
            baseUrl: 'https://github.com',
            source: 'github.com',
            removeFromCommit: false,
            regex: /#\d+/g,
          },
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
        message: `${choreMessage}\n\n\${nextRelease.notes}`,
      },
    ],
    [
      '@semantic-release/github',
      {
        releasedLabels: [':rocket: released'],
        assets: [
          {
            path: 'dist/**',
          },
        ],
      },
    ],
  ],
  extends: ['semantic-release-config-gitmoji'],
};

module.exports = config;
