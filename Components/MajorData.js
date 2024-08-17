// MajorData.js
const groups = [
  { groupName: 'SE-2201', subjects: ['Calculus 2', 'Database Management Systems'] },
  { groupName: 'SE-2202', subjects: ['Calculus 2', 'Database Management Systems'] },
  { groupName: 'SE-2203', subjects: ['Calculus 2', 'Database Management Systems'] },
  { groupName: 'SE-2204', subjects: ['Calculus 2', 'Database Management Systems'] },
  { groupName: 'SE-2205', subjects: ['Design and Analysis of Algorithms'] },
  { groupName: 'SE-2206', subjects: ['Design and Analysis of Algorithms'] },
  { groupName: 'SE-2207', subjects: ['Design and Analysis of Algorithms'] },
  { groupName: 'SE-2208', subjects: ['Database Management Systems'] },
  { groupName: 'SE-2209', subjects: ['Database Management Systems'] },
];

const getSubjectsForGroup = (groupName) => {
  const group = groups.find(group => group.groupName === groupName);
  return group ? group.subjects : ['Subject not found'];
};

export { groups, getSubjectsForGroup };
