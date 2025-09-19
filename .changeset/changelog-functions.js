const getReleaseLine = async (changeset, type) => {
  const [firstLine, ...futureLines] = changeset.summary
    .split('\n')
    .map((l) => l.trimRight());

  // 패키지명에서 스코프 제거
  const packageName = changeset.id.replace('@bookmark-finder-extension/', '');

  const typeEmoji = {
    major: '💥',
    minor: '✨',
    patch: '🐛',
  };

  let returnVal = `- ${typeEmoji[type] || '📝'} **${packageName}**: ${firstLine}`;

  if (futureLines.length > 0) {
    returnVal += `\n${futureLines.map((l) => `  ${l}`).join('\n')}`;
  }

  return returnVal;
};

const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return '';

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - \`${dependency.name}@${dependency.version}\``
  );

  return ['- �� **Updated dependencies:**', ...updatedDependenciesList].join(
    '\n'
  );
};

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};
