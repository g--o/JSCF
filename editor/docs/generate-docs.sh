#!/usr/bin/bash
gen_json="$(~/tools/tern/bin/condense --plugin local-scope-condense --name jscf ../../jscf/**/*.js)"
echo "var def_jscf = $gen_json;" > jscf-tern-docs.js
echo "done"
