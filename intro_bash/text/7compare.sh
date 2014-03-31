#!/bin/bash
#compare $() , `` and ()

$(echo 100)
`echo 100`
(echo 100; echo 100)
