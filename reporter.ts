import {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter'
import * as fs from 'fs'

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite): void {
    console.log(`Execution of ${suite.allTests().length} tests`)
  }

  onEnd(result: FullResult): Promise<{ status?: FullResult['status'] } | undefined | void> | void {
    console.log(`Execution finished with status of ${result.status}`)
  }

  onTestBegin(test: TestCase, result: TestResult): void {
    console.log(`Execution of ${test.title} started`)
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    const execTime = result.duration
    const data = {
      test: test.title,
      status: result.status,
      execTime: execTime,
      errors: result.errors,
    }
    const dataToString = JSON.stringify(data, null, 2)

    fs.writeFileSync('test-result.json', dataToString)
  }
}

export default MyReporter
