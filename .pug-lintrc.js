module.exports = {
  disallowAttributeConcatenation: null,
  disallowAttributeInterpolation: true,
  disallowBlockExpansion: null,
  disallowClassAttributeWithStaticValue: true,
  disallowClassLiterals: null,
  disallowClassLiteralsBeforeAttributes: null,
  disallowClassLiteralsBeforeIdLiterals: null,
  disallowDuplicateAttributes: true,
  disallowHtmlText: null,
  disallowIdAttributeWithStaticValue: null,
  // disallowIdLiterals: true,
  disallowIdLiteralsBeforeAttributes: null,
  disallowMultipleLineBreaks: true,
  disallowSpaceAfterCodeOperator: null,
  disallowSpacesInsideAttributeBrackets: true,
  disallowSpecificAttributes: [
    {
      a: 'name'
    }
  ],
  disallowSpecificTags: null,
  disallowStringConcatenation: true,
  disallowStringInterpolation: null,
  disallowTagInterpolation: null,
  maximumNumberOfLines: null,
  requireClassLiteralsBeforeAttributes: true,
  requireClassLiteralsBeforeIdLiterals: true,
  requireIdLiteralsBeforeAttributes: true,
  requireLineFeedAtFileEnd: true,
  // requireLowerCaseAttributes: true,
  requireLowerCaseTags: true,
  requireSpaceAfterCodeOperator: true,
  requireSpacesInsideAttributeBrackets: null,
  requireSpecificAttributes: [
    // {
    //   form: 'action'
    // },
    // {
    //   img: 'alt'
    // },
    // {
    //   input: 'type'
    // },
    // {
    //   'input[type=submit]': 'value'
    // }
  ],
  requireStrictEqualityOperators: true,
  validateAttributeQuoteMarks: '"',
  validateAttributeSeparator: {
    separator: ', ',
    multiLineSeparator: ',\n'
  },
  validateDivTags: true,
  validateExtensions: true,
  validateIndentation: 2,
  // validateLineBreaks: 'LF',
  validateSelfClosingTags: true
}
