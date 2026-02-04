import random

class MathModel:
    @staticmethod
    def generate_division_x(level):
        """
        Sinh câu hỏi tìm x: x : a = b hoặc a : x = b
        """
        if level == "easy":
            # Bảng cửu chương 2-5
            divisor = random.randint(2, 5)
            quotient = random.randint(2, 9)
        else:
            # Nâng cao cho lớp 4
            divisor = random.randint(6, 12)
            quotient = random.randint(5, 15)
            
        x_value = divisor * quotient
        
        return {
            "question": f"x : {divisor} = {quotient}",
            "correct_answer": x_value,
            "options": random.sample([x_value, x_value + 2, x_value - 5, x_value + 10], 4)
        }