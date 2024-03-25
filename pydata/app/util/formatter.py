def snake_to_camel(snake_str: str) -> str:
    components = snake_str.split('_')
    # 첫 컴포넌트는 그대로 두고, 나머지는 첫 글자를 대문자로 변경
    return components[0] + ''.join(x.title() for x in components[1:])