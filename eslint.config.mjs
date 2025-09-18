// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
 rules: {
    // JavaScript / TypeScript
    'no-console': 'warn',                       
    'no-debugger': 'warn',                      
    'prefer-const': 'error',                    
    'no-unused-vars': 'warn',                   
    '@typescript-eslint/no-unused-vars': 'warn', 

    'vue/multi-word-component-names': 'off',   
    'vue/no-v-html': 'off',                     
    'vue/require-default-prop': 'off',         
    'vue/attribute-hyphenation': ['error', 'never'], 

  },
})
