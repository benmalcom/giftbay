import { usePrevious } from '@chakra-ui/react';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import blankResume from 'data/blankResume.json';
import loremIpsum from 'data/loremIpsum.json';
import useCurrentUser from 'hooks/useCurrentUser';
import { ResumeType, SectionItemType } from 'types/resume';

function useInitialResume() {
  const { user, loading, error } = useCurrentUser();
  const [initialResume, setInitialResume] = useState<ResumeType>(blankResume);
  const prevUser = usePrevious(user);
  useEffect(() => {
    if ((!prevUser && user) || (prevUser && user && !isEqual(prevUser, user))) {
      setInitialResume(currentObject => {
        const result = structuredClone(currentObject);
        result.candidate.name = user.name;
        result.candidate.headline = 'Senior Software Engineer';
        result.candidate.summary = loremIpsum.text;
        result.candidate.contactsAndLinks.email = user.email;
        result.candidate.contactsAndLinks.linkedIn =
          'https://linkedin.com/in/my-name';
        result.candidate.contactsAndLinks.github =
          'https://github.com/in/username';
        result.sections.push({
          id: '1',
          name: 'Work Experience',
          items: [],
        });
        result.sections[0].items.push(
          {
            type: SectionItemType.JobRole,
            order: 1,
            content: {
              id: '1',
              name: 'Staff Software Engineer',
              company: 'Phoenix Inc.',
              location: 'San Francisco, CA',
              sectionId: '1',
              duration: '02/2020 - 01/2021',
              jobFunctions: Array.from(Array(5)).map((item, index) => ({
                id: index.toString(),
                jobRoleId: '1',
                text: loremIpsum.text,
              })),
            },
          },
          {
            type: SectionItemType.JobRole,
            order: 2,
            content: {
              id: '2',
              name: 'Senior Software Engineer',
              company: 'BetrLend Technologies',
              location: 'Boston, MA',
              sectionId: '1',
              duration: '02/2021 - 01/2022',
              jobFunctions: Array.from(Array(5)).map((item, index) => ({
                id: index.toString(),
                jobRoleId: '2',
                text: loremIpsum.text,
              })),
            },
          }
        );
        return result;
      });
    }
  }, [prevUser, user]);
  return initialResume;
}
export default useInitialResume;
