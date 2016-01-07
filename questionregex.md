(\(\d+\)) searches for section numbers e.g. (06) or (8)

\d.?((\(\w+\)).)+ searches for question numbers(if they have one) finds 3 (a) and 3 (a) (i) etc...

\[(\d).+\] searches for the marks for questions use this to find end of question.

(\d.*(\(.+\))+)(.+[^\[\]]+)(\[\d.+\]) find between sub question number and number of marks

(\d.*((\(.+\).)*))(.+[^\[\]]+)(\[6.+\]) find six marker questions that start with a full question use or with subquestion.
