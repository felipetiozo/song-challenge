export default async (expectedError, fun, ...context) => {
  try {
    await fun(...context)
    throw new Error(`Should have thrown ${expectedError}, but succeded`)
  } catch (e) {
    if (e.name != expectedError) {
      throw e
    }
  }
}
