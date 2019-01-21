#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n in.com.kj.jayapp.hindupanchang/host.exp.exponent.MainActivity
