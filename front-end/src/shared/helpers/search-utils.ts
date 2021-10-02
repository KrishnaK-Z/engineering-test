import { get, LocalStorageKey } from "./local-storage"

export const search = (searchTerm: any) => {
  const students: any = get(LocalStorageKey.students);

  // Tokenize the search terms and remove empty spaces
  let tokens: any = searchTerm
    .toLowerCase()
    .split(' ')
    .filter((token: string) => {
      return token.trim() !== '';
    });

  if (tokens.length) {
    //  Create a regular expression of all the search terms
    const searchTermRegex = new RegExp(tokens.join('|'), 'gim');

    const filteredList: any = students.filter((student: any) => {
      // Create a string of all object values
      let studentString: string = '';
      for(let key in student) {
        if(student.hasOwnProperty(key) && student[key] !== '') {
          studentString += student[key].toString().toLowerCase().trim() + ' ';
        }
      }
      // Return book objects where a match with the search regex if found
      return studentString.match(searchTermRegex);
    });

    return filteredList;
  }

  return students;
}
